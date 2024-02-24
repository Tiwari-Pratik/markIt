"use server";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { getUserByEmail, getVerificationTokenByToken } from "./data";
import {
  RegisterState,
  LoginState,
  LoginFormSchema,
  RegisterFormSchema,
  ResetState,
  ResetFormSchema,
  ChangePasswordState,
  ChangePasswordFormSchema,
} from "./schema";
import { signIn, signOut } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "./myRoutes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "./tokens";
import { sendPasswordResetEmail, sendVerificationEmail } from "./mail";

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
  // console.log(Object.fromEntries(formData.entries()));
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

  await sendVerificationEmail(verificationToken.email, verificationToken.token);
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
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
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

export const newEmailVerfication = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken)
      return { message: "Token does not exist", success: false };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { message: "Token has expired", success: false };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser)
      return { message: "Email does not exist", success: false };

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return { message: "Email Verified", success: true };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  prevState: ResetState,
  formData: FormData,
) => {
  const validatedData = ResetFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedData.success) {
    return {
      message: "Failed to send Email",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedData.data;
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { message: "Invalid Credentials: Email does not exist!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
      return {
        message:
          "your Email is not verified. Please verify your Email first. Confirmation Email sent.",
      };
    }

    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendPasswordResetEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return {
      message: "Password reset email sent!",
    };
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (
  token: string,
  prevState: ChangePasswordState,
  formData: FormData,
) => {
  const validatedData = ChangePasswordFormSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedData.success) {
    return {
      message: "Failed to change password",
      errors: validatedData.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { password } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken)
      return {
        message:
          "Token does not exist. You are not authorized to change password",
        success: false,
      };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { message: "Token has expired", success: false };

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser)
      return { message: "Email does not exist", success: false };

    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        email: existingToken.email,
        password: hashedPassword,
      },
    });

    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return { message: "Password changed successfully", success: true };
  } catch (error) {
    throw error;
  }
};
