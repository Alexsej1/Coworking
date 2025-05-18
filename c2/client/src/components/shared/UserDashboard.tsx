import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Building,
  User,
  Clock,
  Calendar,
  Settings,
  PenSquare,
  LogOut,
} from "lucide-react";

// Mock data - replace with your actual data fetching logic
const mockUserData = {
  name: "Иван Петров",
  username: "ivan_petrov",
  email: "ivan@example.com",
  avatar: "/assets/images/avatar.jpg",
  memberSince: "15.03.2023",
  activeCoworkings: [
    {
      id: 1,
      name: "Коворкинг Центр",
      address: "ул. Пушкина, 10",
      status: "Активен",
      expiryDate: "30.06.2025",
      visits: 12,
    },
    {
      id: 2,
      name: "WorkHub",
      address: "пр. Ленина, 45",
      status: "Активен",
      expiryDate: "15.07.2025",
      visits: 8,
    },
  ],
  history: [
    {
      id: 1,
      coworkingName: "Коворкинг Центр",
      date: "12.05.2025",
      time: "10:00 - 17:00",
    },
    {
      id: 2,
      coworkingName: "WorkHub",
      date: "10.05.2025",
      time: "12:00 - 18:00",
    },
    {
      id: 3,
      coworkingName: "Коворкинг Центр",
      date: "07.05.2025",
      time: "09:00 - 14:30",
    },
  ],
};

const UserDashboard = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    // Replace with actual API call
    // Example:
    // const fetchUserData = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch('/api/user/profile');
    //     const data = await response.json();
    //     setUserData(data);
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchUserData();
  }, []);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
    // Example: Navigate to sign-in page
    // navigate("/sign-in");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{userData.name}</h1>
            <p className="text-muted-foreground">@{userData.username}</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} />
          Выйти
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden sm:inline">Профиль</span>
          </TabsTrigger>
          <TabsTrigger value="coworkings" className="flex items-center gap-2">
            <Building size={16} />
            <span className="hidden sm:inline">Коворкинги</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock size={16} />
            <span className="hidden sm:inline">История</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Настройки</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Личная информация</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <PenSquare size={16} />
                  Изменить
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Имя
                  </h3>
                  <p>{userData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Логин
                  </h3>
                  <p>{userData.username}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <p>{userData.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Участник с
                  </h3>
                  <p>{userData.memberSince}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coworkings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Активные коворкинги</CardTitle>
            </CardHeader>
            <CardContent>
              {userData.activeCoworkings.length > 0 ? (
                <div className="grid gap-4">
                  {userData.activeCoworkings.map((coworking) => (
                    <Card key={coworking.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 flex flex-col md:flex-row gap-4 justify-between">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg">
                              {coworking.name}
                            </h3>
                            <p className="text-muted-foreground">
                              {coworking.address}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                {coworking.status}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar
                                size={16}
                                className="text-muted-foreground"
                              />
                              <span>
                                Действителен до: {coworking.expiryDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock
                                size={16}
                                className="text-muted-foreground"
                              />
                              <span>Посещений: {coworking.visits}</span>
                            </div>
                          </div>
                          <div>
                            <Button>Забронировать</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  У вас нет активных коворкингов
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>История посещений</CardTitle>
            </CardHeader>
            <CardContent>
              {userData.history.length > 0 ? (
                <div className="relative overflow-x-auto rounded-md border">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Коворкинг
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Дата
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Время
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.history.map((visit) => (
                        <tr key={visit.id} className="border-b">
                          <td className="px-6 py-4">{visit.coworkingName}</td>
                          <td className="px-6 py-4">{visit.date}</td>
                          <td className="px-6 py-4">{visit.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  У вас нет истории посещений
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки аккаунта</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Изменить пароль</h3>
                <div className="grid gap-4 max-w-md">
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Текущий пароль
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Новый пароль
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">
                      Подтвердите новый пароль
                    </label>
                    <input
                      type="password"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <Button className="w-full md:w-auto">Сохранить пароль</Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Настройки уведомлений</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="email-notif" type="checkbox" className="mr-2" />
                    <label htmlFor="email-notif">
                      Получать уведомления по email
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="marketing" type="checkbox" className="mr-2" />
                    <label htmlFor="marketing">
                      Получать новости и специальные предложения
                    </label>
                  </div>
                </div>
                <Button className="mt-4">Сохранить настройки</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
