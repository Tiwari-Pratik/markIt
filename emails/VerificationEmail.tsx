import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import * as React from "react";

import {
  Body,
  Head,
  Hr,
  Heading,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailProps {
  userEmail: string;
  confirmLink: string;
}

export function VerificationEmail({ userEmail, confirmLink }: EmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Live Markdown Editor with beautiful custom preview</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading as="h2">.markIt</Heading>
          <Text style={paragraph}>Hi {userEmail},</Text>
          <Text style={paragraph}>
            Welcome to markIt, the beautiful and accessible live Markdown
            editor.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={confirmLink}>
              Verify Your Email
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The markIt team
          </Text>
          <Hr style={hr} />
        </Container>
      </Body>
    </Html>
  );
}

export default VerificationEmail;
// KoalaWelcomeEmail.PreviewProps = {
//   userFirstname: "Alan",
// } as KoalaWelcomeEmailProps;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};
