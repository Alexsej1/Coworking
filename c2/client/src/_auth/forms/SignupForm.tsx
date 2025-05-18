import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { SignupValidation } from "@/lib/validation";
import { useState } from "react";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Отправка данных регистрации:", values);
      const response = await fetch("http://localhost:8800/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();
      console.log("Ответ сервера:", response.status, responseData);

      if (response.ok) {
        console.log("Пользователь успешно зарегистрирован");
        // Задержка перед переходом для лучшего UX
        setTimeout(() => {
          navigate("/sign-in");
        }, 1000);
      } else {
        console.error("Ошибка регистрации:", responseData);
        setError(responseData.message || "Произошла ошибка при регистрации");
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      setError("Произошла ошибка сети. Проверьте подключение к серверу.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-6">
        <div className="w-full min-w-4xl">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 md:p-8 flex flex-col gap-6"
              >
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-4xl font-bold">Регистрация</h1>
                  <p className="text-balance text-muted-foreground">
                    Создайте аккаунт, чтобы начать
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Введите имя"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Логин</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Введите логин"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Введите почту"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Введите пароль"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                      <Loader />
                    </div>
                  ) : (
                    "Зарегистрироваться"
                  )}
                </Button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <p className="text-sm text-center text-muted-foreground">
                  Уже есть аккаунт?{" "}
                  <Link to="/sign-in" className="underline underline-offset-4">
                    Войти
                  </Link>
                </p>
              </form>

              <div className="relative hidden bg-muted md:block mr-6 ">
                <img
                  src="/assets/images/bg.jpg"
                  alt="Registration"
                  className="absolute inset-0 h-full w-full  object-cover  rounded-3xl dark:brightness-[0.2] dark:grayscale "
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          Нажимая «Зарегистрироваться», вы соглашаетесь с{" "}
          <a href="#">условиями сервиса</a> и{" "}
          <a href="#">политикой конфиденциальности</a>.
        </div>
      </div>
    </Form>
  );
};

export default SignupForm;
