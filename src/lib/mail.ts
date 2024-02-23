import { Resend } from "resend";
import { VerificationEmail } from "../../emails/VerificationEmail";
import ChangePasswordEmail from "../../emails/ChangePasswordEmail";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    react: VerificationEmail({ userEmail: email, confirmLink: confirmLink }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/change-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "change your password",
    react: ChangePasswordEmail({ userEmail: email, confirmLink: confirmLink }),
  });
};
