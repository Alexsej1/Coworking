
import { BookingFormData, CoworkingSpace } from "./types";

/**
 * Отправка данных бронирования на сервер
 * @param data Данные формы
 * @param space Информация о коворкинге
 * @returns Promise с результатом операции
 */
export async function sendBooking(
  data: BookingFormData,
  space: CoworkingSpace
) {
  const bookingData = {
    userName: data.userName,
    email: data.email,
    phone: data.phone,
    guests: data.guests,
    date: data.date ? data.date.toLocaleDateString("ru-RU") : "",
    time: data.time,
    notes: data.notes,
    space: {
      id: space.id,
      name: space.name,
      location: space.location,
      price: space.price,
    },
  };

  // Здесь пока лог, позже можно заменить на fetch/axios
  console.log("Отправка данных на сервер:", bookingData);

  // Пример для будущей интеграции:
  // const response = await fetch("/api/book", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(bookingData),
  // });
  // return await response.json();

  return Promise.resolve({ status: "ok" }); // временная заглушка
}

/**
 * Функция для получения иконок удобств
 * @param amenity Название удобства
 * @returns Эмодзи для удобства
 */
export function getAmenityIcon(amenity: string) {
  switch (amenity) {
    case "WiFi":
      return "📶";
    case "Кофе":
      return "☕";
    case "Кухня":
      return "🍽️";
    case "Принтер":
      return "🖨️";
    case "Переговорная":
      return "👥";
    case "Парковка":
      return "🚗";
    case "24/7":
      return "🕒";
    case "Ресепшн":
      return "👨‍💼";
    case "Событийный зал":
      return "🎭";
    default:
      return "✓";
  }
}
