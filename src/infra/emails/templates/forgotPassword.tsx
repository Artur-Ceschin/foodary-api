import { Html, Head, Text, Row, Section, Column, Heading } from "react-email";
import * as React from "react";
import { TailwindConfig } from "../components/TailwindConfig";

interface IForgotPasswordProps {
  confirmationCode: string
}

export default function ForgotPassword({ confirmationCode } : IForgotPasswordProps) {
  return (
    <Html>
      <Head />
      <TailwindConfig>
        <Section>
          <Row>
            <Column className="font-sans text-center pt-10">
              <Heading as='h1' className="text-2xl leading-[0]">
                Recupere a sua conta
              </Heading>
              <Heading as='h2' className="font-normal text-base text-gray-600">
                Resete sua senha e volte ao foco 💪
              </Heading>
            </Column>
          </Row>

          <Row>
            <Column className="text-center pt-4">
              {/* We can make this a button on the web */}
              <span className="bg-gray-200 inline-block px-8 py-4 font-sans text-3xl rounded-md font-bold tracking-[16px]">
                { confirmationCode }
              </span>
            </Column>
          </Row>

          <Row>
            <Column className="font-sans text-center pt-10">
              <Text className="text-small text-gray-600">
                Se você não solicitou essa troca, fique tranquilo, sua conta continue segura!
              </Text>
            </Column>
          </Row>
        </Section>
      </TailwindConfig>
    </Html>
  );
}


ForgotPassword.PreviewProps = {
  confirmationCode: '334685'
}
