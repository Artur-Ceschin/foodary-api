
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import { Controller } from 'src/applications/contracts/Controller';
import { signUpSchema, SignUpBody } from './schemas/signUpSchema';
import { SignUpUseCase } from 'src/applications/usecases/auth/SignUpUseCase';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<unknown> {

  constructor(private signUpUseCase: SignUpUseCase) {
    super();
  }

  protected async handle(
    { body }: Controller.Request<SignUpBody>):
    Promise<Controller.Response<SignUpController.Response>> {

    const { account } = body;

    const { accessToken, refreshToken } = await this.signUpUseCase.execute(account);

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Response = {
    accessToken: string
    refreshToken: string
  }
}
