"use server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { redirect } from "next/navigation";
import { getUserByEmail } from "./data";
import {
  RegisterState,
  LoginState,
  LoginFormSchema,
  RegisterFormSchema,
} from "./schema";
import { signIn, signOut } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "./myRoutes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "./tokens";

// const LoginFormSchema = z.object({
//   email: z
//     .string({ required_error: "Must provide an Email" })
//     .email({ message: "Invalid Email Address" }),
//   password: z
//     .string({ required_error: "Must provide a password" })
//     .min(8, { message: "Password must be atleast 8 characters long" }),
// });
//
// const RegisterFormSchema = z
//   .object({
//     email: z
//       .string({ required_error: "Must provide an Email" })
//       .email({ message: "Invalid Email Address" }),
//     password: z
//       .string({ required_error: "Must provide a password" })
//       .min(8, { message: "Password must be atleast 8 characters long" }),
//     confirmPassword: z
//       .string({ required_error: "Must provide a password" })
//       .min(8, { message: "Password must be atleast 8 characters long" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });
//
// interface LoginState {
//   message?: string | null;
//   errors?: {
//     email?: string[];
//     password?: string[];
//   };
// }
// interface RegisterState {
//   message?: string | null;
//   errors?: {
//     email?: string[];
//     password?: string[];
//     confirmPassword?: string[];
//   };
// }

export const registerUser = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  console.log(Object.fromEntries(formData.entries()));
  const validatedData = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedData.success) {
    return {
      message: "Failed to register user",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email, password, confirmPassword } = validatedData.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      message: "Failed to register user",
      errors: {
        email: ["Email already taken. Please use another email"],
      },
    };
  }

  try {
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: failed to create user",
    };
  }

  // return {
  //   message: "User created successfully",
  // };
  // TODO: send verification token email

  const verificationToken = await generateVerificationToken(email);
  return { message: "Confirmation Email sent !" };
  // redirect("/");
};

export const loginUser = async (prevState: LoginState, formData: FormData) => {
  const validatedData = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    return {
      message: "Failed to login",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedData.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { message: "Invalid Credentials: Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    return {
      message: "Please verify your Email first. Confirmation Email sent.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials. Can not Login" };
        default:
          return { message: "Something went wrong!" };
      }
    }
    throw error;
  }
  return { message: null };
};

export const logoutUser = async () => {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
};

export const githubLogin = async () => {
  try {
    await signIn("github", { redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async () => {
  try {
    await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
  } catch (error) {
    throw error;
  }
};
