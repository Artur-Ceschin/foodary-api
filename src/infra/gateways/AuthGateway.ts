import { ConfirmForgotPasswordCommand, ExpiredCodeException, ForgotPasswordCommand, GetTokensFromRefreshTokenCommand, InitiateAuthCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { cognitoClient } from '@infra/clients/cognitoClient';
import { Injectable } from '@kernel/decorators/Injectable';
import { AppConfig } from '@shared/config/AppConfig';
import { createHmac } from 'crypto';
import { CodeMismatchExceptionError } from 'src/applications/errors/application/CodeMismatchExceptionError';
import { ExpiredCodeExceptionError } from 'src/applications/errors/application/ExpiredCodeExceptionError';
import { BadRequest } from 'src/applications/errors/http/BadRequest';

@Injectable()
export class AuthGateway {

  constructor(private readonly appConfig: AppConfig){}

  async signIn(
    { email, password }:
     AuthGateway.SignInParams,
  ): Promise<AuthGateway.SignInResult> {

    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.appConfig.auth.cognito.client.id,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.getSecretHash(email),
      },
    });

    const { AuthenticationResult } = await cognitoClient.send(command);

    if(!AuthenticationResult?.AccessToken || !AuthenticationResult.RefreshToken) {
      throw new Error(`Cannot authenticate user: ${email}`);
    }

    return {
      accessToken: AuthenticationResult.AccessToken,
      refreshToken: AuthenticationResult.RefreshToken,
    };

  }

  async signUp(
    {
      email,
      password,
      internalId,
    }:
     AuthGateway.SignUpParams,
  ): Promise<AuthGateway.SignUpResult> {

    const command = new SignUpCommand({
      ClientId: this.appConfig.auth.cognito.client.id,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'custom:internalId', Value: internalId },
      ],
      SecretHash: this.getSecretHash(email),
    });

    const { UserSub: externalId } = await cognitoClient.send(command);

    if(!externalId) {
      throw new Error(`Cannot signup user: ${email}`);
    }

    return {
      externalId,
    };
  }

  async refreshToken({
    refreshToken,
  }: AuthGateway.RefreshTokenParams): Promise<AuthGateway.RefreshTokenResult> {
    const command = new GetTokensFromRefreshTokenCommand({
      ClientId: this.appConfig.auth.cognito.client.id,
      RefreshToken: refreshToken,
      ClientSecret: this.appConfig.auth.cognito.client.secret,
    });

    const { AuthenticationResult } = await cognitoClient.send(command);

    if(!AuthenticationResult?.AccessToken || !AuthenticationResult.RefreshToken) {
      throw new Error('Cannot refresh token');
    }

    return {
      accessToken: AuthenticationResult.AccessToken,
      refreshToken: AuthenticationResult.RefreshToken,
    };
  }

  async forgotPassword({ email }: AuthGateway.ForgotPasswordParams): Promise<void> {

    const command = new ForgotPasswordCommand({
      ClientId: this.appConfig.auth.cognito.client.id,
      Username: email,
      SecretHash: this.getSecretHash(email),
    });

    await cognitoClient.send(command);
  }

  async confirmForgotPassword({
    email,
    confirmationCode,
    password,
  }:AuthGateway.ConfirmForgotPasswordParams):Promise<void> {

    try {
      const command = new ConfirmForgotPasswordCommand({
        ClientId: this.appConfig.auth.cognito.client.id,
        ConfirmationCode: confirmationCode,
        Password: password,
        Username: email,
        SecretHash: this.getSecretHash(email),
      });

      await cognitoClient.send(command);
    } catch (error) {
      if(error instanceof ExpiredCodeException) {
        throw new ExpiredCodeExceptionError();
      }

      if(error instanceof CodeMismatchExceptionError) {
        throw new CodeMismatchExceptionError();
      }

      throw new BadRequest('Failed. Try again');
    }
  }

  private getSecretHash(email: string): string {
    const { id, secret } = this.appConfig.auth.cognito.client;
    return createHmac('SHA256', secret)
      .update(`${email}${id}`)
      .digest('base64');
  }
}

export namespace AuthGateway{
  export type SignUpParams = {
    email: string;
    password: string
    internalId: string
  }

  export type SignUpResult = {
    externalId: string
  }

  export type SignInParams = {
    email: string;
    password: string
   }

  export type SignInResult = {
    accessToken: string;
    refreshToken: string
  }

  export type RefreshTokenParams = {
    refreshToken: string;
  }

  export type RefreshTokenResult = {
    accessToken: string;
    refreshToken: string
  }

  export type ForgotPasswordParams = {
    email: string;
  }

  export type ConfirmForgotPasswordParams = {
    email: string;
    password: string
    confirmationCode: string
  }
}
