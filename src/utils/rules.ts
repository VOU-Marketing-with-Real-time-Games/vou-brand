import * as zod from "zod";

const authValidation = {
  username: zod
    .string()
    .min(1, { message: "Username is required" })
    .max(160, "Maximum length is 160 characters")
    .trim(),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(8, "Length from 8 to 160 characters")
    .max(160, "Length from 8 to 160 characters"),
};

export const loginSchema = zod.object({
  username: authValidation.username,
  password: authValidation.password,
});

// export const registerSchema = zod
//   .object({
//     email: authValidation.email,
//     password: authValidation.password,
//     confirmPassword: authValidation.confirmPassword,
//     name: authValidation.name,
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Confirm password does not match",
//     path: ["confirmPassword"],
//   });
//
// export const resetPasswordSchema = zod
//   .object({
//     password: authValidation.password,
//     confirmPassword: authValidation.confirmPassword,
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Confirm password does not match",
//     path: ["confirmPassword"],
//   });

export type LoginSchema = zod.infer<typeof loginSchema>;
// export type RegisterSchema = zod.infer<typeof registerSchema>;
// export type ResetPasswordSchema = zod.infer<typeof resetPasswordSchema>;
