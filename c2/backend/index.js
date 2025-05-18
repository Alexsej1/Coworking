import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Coworking",
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к БД MySQL:", err);
    return;
  }
  console.log("Успешное подключение к базе данных MySQL");
});

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/spaces", (req, res) => {
  console.log("Запрос к /spaces получен");
  const q = `
    SELECT
        s.id,
        s.name,
        s.location,
        s.price,
        s.type,
        s.description,
        s.image,
        s.latitude,
        s.longitude,
        GROUP_CONCAT(a.name SEPARATOR ',') AS amenities_str
    FROM
        spaces s
    LEFT JOIN
        coworking_amenities ca ON s.id = ca.coworking_id
    LEFT JOIN
        amenities a ON ca.amenity_id = a.id
    GROUP BY
        s.id, s.name, s.location, s.price, s.type, s.description, s.image, s.latitude, s.longitude;
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.error("Ошибка выполнения запроса к базе данных:", err);
      return res.status(500).json(err);
    }
    console.log("Данные из базы данных (с amenities_str):", data);

    const formattedData = data.map((space) => ({
      ...space,
      amenities: space.amenities_str ? space.amenities_str.split(",") : [],
      amenities_str: undefined,
    }));

    console.log("Отформатированные данные:", formattedData);
    res.json(formattedData);
  });
});

app.get("/amenities", (req, res) => {
  console.log("Запрос к /amenities получен");
  const q = "SELECT * FROM `amenities`";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Ошибка выполнения запроса к базе данных:", err);
      return res.status(500).json(err);
    }
    console.log("Данные из базы данных:", data);
    return res.json(data);
  });
});

app.get("/coworking_amenities", (req, res) => {
  console.log("Запрос к /coworking_amenities получен");
  const q = "SELECT * FROM `coworking_amenities`";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Ошибка выполнения запроса к базе данных:", err);
      return res.status(500).json(err);
    }
    console.log("Данные из базы данных:", data);
    return res.json(data);
  });
});

app.get("/blog", (req, res) => {
  console.log("Запрос к /blog получен");
  const q = "SELECT * FROM `blog` ORDER BY created_at DESC";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Ошибка выполнения запроса к базе данных:", err);
      return res.status(500).json(err);
    }
    console.log("Данные блога получены:", data.length, "записей");
    return res.json(data);
  });
});

app.get("/blog/:id", (req, res) => {
  const blogId = req.params.id;
  console.log(`Запрос к /blog/${blogId} получен`);

  const q = "SELECT * FROM `blog` WHERE id = ?";
  db.query(q, [blogId], (err, data) => {
    if (err) {
      console.error("Ошибка выполнения запроса к базе данных:", err);
      return res.status(500).json(err);
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    console.log("Данные блога получены для ID:", blogId);
    return res.json(data[0]);
  });
});

app.post("/spaces", (req, res) => {
  const q =
    "INSERT INTO spaces (`name`, `location`, `price`, `type`, `description`, `image`, `latitude`, `longitude`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.location,
    req.body.price,
    req.body.type,
    req.body.description,
    req.body.image,
    req.body.latitude,
    req.body.longitude,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Ошибка при добавлении пространства:", err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ message: "Пространство успешно добавлено", id: data.insertId });
  });
});

app.post("/users", (req, res) => {
  console.log("Получен запрос на регистрацию пользователя:", req.body);
  const { name, username, email, password } = req.body;

  // Проверка на существующего пользователя
  const checkUserQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(checkUserQuery, [email, username], (err, results) => {
    if (err) {
      console.error("Ошибка при проверке пользователя:", err);
      return res
        .status(500)
        .json({ message: "Ошибка при проверке пользователя" });
    }

    if (results.length > 0) {
      console.log("Пользователь уже существует");
      return res.status(409).json({
        message: "Пользователь с таким email или username уже существует",
      });
    }

    const q =
      "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";
    const values = [name, username, email, password];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error("Ошибка при создании пользователя:", err);
        return res
          .status(500)
          .json({ message: "Ошибка при создании пользователя" });
      }
      console.log("Пользователь успешно зарегистрирован:", data);
      return res.status(201).json({
        message: "Пользователь успешно зарегистрирован",
        userId: data.insertId,
      });
    });
  });
});

app.post("/login", (req, res) => {
  console.log("Получен запрос на авторизацию:", req.body);
  const { email, password } = req.body;

  const q =
    "SELECT id, name, username, email FROM users WHERE email = ? AND password = ?";

  db.query(q, [email, password], (err, data) => {
    if (err) {
      console.error("Ошибка при проверке пользователя:", err);
      return res
        .status(500)
        .json({ message: "Ошибка при проверке пользователя" });
    }

    if (data.length === 0) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    console.log("Пользователь успешно авторизован:", data[0]);
    return res.status(200).json({
      message: "Успешная авторизация",
      user: data[0],
    });
  });
});

app.post("/bookings", (req, res) => {
  console.log("Получен запрос на бронирование:", req.body);

  const {
    space_id,
    user_name,
    email,
    phone,
    guests,
    booking_date,
    booking_time,
    notes,
  } = req.body;

  const checkQuery = `
    SELECT id FROM bookings 
    WHERE space_id = ? 
    AND booking_date = ? 
    AND booking_time = ?
    AND status != 'canceled'
  `;

  db.query(
    checkQuery,
    [space_id, booking_date, booking_time],
    (err, results) => {
      if (err) {
        console.error("Ошибка при проверке бронирования:", err);
        return res.status(500).json({
          success: false,
          message: "Ошибка при проверке бронирования",
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Это время уже занято",
        });
      }

      const q = `
      INSERT INTO bookings (
        space_id, 
        user_name, 
        email, 
        phone, 
        guests, 
        booking_date, 
        booking_time, 
        notes,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
    `;

      const values = [
        space_id,
        user_name,
        email,
        phone,
        guests,
        booking_date,
        booking_time,
        notes,
      ];

      db.query(q, values, (err, data) => {
        if (err) {
          console.error("Ошибка при бронировании:", err);
          return res.status(500).json({
            success: false,
            message: "Ошибка при бронировании",
          });
        }

        console.log("Бронирование успешно создано:", data);
        return res.status(201).json({
          success: true,
          message: "Бронирование успешно создано",
          bookingId: data.insertId,
        });
      });
    }
  );
});

app.listen(8800, () => {
  console.log("Сервер запущен на порту 8800");
});
