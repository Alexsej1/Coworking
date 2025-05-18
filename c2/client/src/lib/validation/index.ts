import * as z from "zod";

export const SignupValidation = z.object({
  name: z.string().min(2, { message: "Слишком короткое имя" }),
  username: z
    .string()
    .min(2, { message: "Слишком короткое имя" })
    .max(50, { message: "Слишком длинное имя" }),
  email: z.string().email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не менее 8 символов" })
    .regex(/^(?=.*\d).+$/, {
      message: "Пароль должен содержать хотя бы одну цифру",
    }),
});

export const SigninValidation = z.object({
  email: z.string().email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(8, { message: "Пароль должен быть не менее 8 символов" })
    .regex(/^(?=.*\d).+$/, {
      message: "Пароль должен содержать хотя бы одну цифру",
    }),
});
