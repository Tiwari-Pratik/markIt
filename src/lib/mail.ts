import { Resend } from "resend";
import { VerificationEmail } from "../../emails/VerificationEmail";
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
