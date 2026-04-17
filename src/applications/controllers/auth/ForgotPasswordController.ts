
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import { Controller } from 'src/applications/contracts/Controller';
import { ForgotPasswordBody, forgotPasswordSchema } from './schemas/forgotPasswordSchema';
import { ForgotPasswordUseCase } from 'src/applications/usecases/auth/ForgotPasswordUseCase';

@Injectable()
@Schema(forgotPasswordSchema)
export class ForgotPasswordController extends Controller<'public', ForgotPasswordController.Response> {

  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected async handle(
    { body }: Controller.Request<'public', ForgotPasswordBody>):
    Promise<Controller.Response<ForgotPasswordController.Response>> {

    try {
      const { email } = body;

      await this.forgotPasswordUseCase.execute({ email });
    } catch {
      //
    }

    return {
      statusCode: 204,
    };
  }
}

export namespace ForgotPasswordController {
  export type Response = null
}
