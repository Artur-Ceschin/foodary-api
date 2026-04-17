
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import { Controller } from 'src/applications/contracts/Controller';
import { ConfirmForgotPasswordBody, confirmForgotPasswordSchema } from './schemas/confirmForgotPasswordSchema';
import { ConfirmForgotPasswordUseCase } from 'src/applications/usecases/auth/ConfirmForgotPasswordUseCase';

@Injectable()
@Schema(confirmForgotPasswordSchema)
export class ConfirmForgotPasswordController extends Controller<'public', ConfirmForgotPasswordController.Response> {

  constructor(private confirmForgotPasswordUseCase: ConfirmForgotPasswordUseCase) {
    super();
  }

  protected async handle(
    { body }: Controller.Request<'public', ConfirmForgotPasswordBody>):
    Promise<Controller.Response<ConfirmForgotPasswordController.Response>> {

    const {
      email,
      password,
      confirmationCode,
    } = body;

    await this.confirmForgotPasswordUseCase.execute({
      email,
      password,
      confirmationCode,
    });

    return {
      statusCode: 204,
    };

  }
}

export namespace ConfirmForgotPasswordController {
  export type Response = null
}
