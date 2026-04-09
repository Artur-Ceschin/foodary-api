
import { Injectable } from '@kernel/decorators/Injectable';
import { Schema } from '@kernel/decorators/Schema';
import { Controller } from 'src/applications/contracts/Controller';
import { SignInUseCase } from 'src/applications/usecases/auth/SignInUseCase';
import { SignInBody, signInSchema } from './schemas/signInSchema';

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<unknown> {

  constructor(private signInUseCase: SignInUseCase) {
    super();
  }

  protected async handle(
    { body }: Controller.Request<SignInBody>):
    Promise<Controller.Response<SignInController.Response>> {

    const { email, password } = body;

    const {
      accessToken,
      refreshToken,
    } = await this.signInUseCase.execute({
      email,
      password,
    });

    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignInController {
  export type Response = {
    accessToken: string
    refreshToken: string
  }
}
