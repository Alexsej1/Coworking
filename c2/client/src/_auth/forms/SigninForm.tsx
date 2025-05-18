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
import { SigninValidation } from "@/lib/validation";
import { useState } from "react";

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8800/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Успешная авторизация:", data);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Ошибка при входе");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setError("Произошла ошибка сети при попытке входа");
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
                  <h1 className="text-4xl font-bold">Вход</h1>
                  <p className="text-balance text-muted-foreground">
                    Вход в ваш аккаунт
                  </p>
                </div>

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
                    "Войти"
                  )}
                </Button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <p className="text-sm text-center text-muted-foreground">
                  Еще нет аккаунта?{" "}
                  <Link to="/sign-up" className="underline underline-offset-4">
                    Зарегистрироваться
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
      </div>
    </Form>
  );
};

export default SigninForm;
