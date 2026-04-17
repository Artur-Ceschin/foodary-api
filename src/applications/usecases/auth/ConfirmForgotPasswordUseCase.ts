import { Injectable } from '@kernel/decorators/Injectable';
import { AuthGateway } from 'src/infra/gateways/AuthGateway';

@Injectable()
export class ConfirmForgotPasswordUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
  ){}

  async execute({ email, password, confirmationCode }: ConfirmForgotPasswordUseCase.Input): Promise<void> {
    await this.authGateway.confirmForgotPassword({
      email,
      password,
      confirmationCode,
    });
  }
}

export namespace ConfirmForgotPasswordUseCase {
  export type Input = {
    email: string
    password: string
    confirmationCode: string
  }
}
