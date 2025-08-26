import { Schema } from '@kernel/decorators/schema';
import { Controller } from '@application/contracts/Controller';
import { SignUpBody, signUpSchema } from './schemas/signUpSchema';
import { SignUpUseCase } from '@application/usecases/auth/SignUpUseCase';
import { Injectable } from '@kernel/decorators/injectable';

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<SignUpController.Response> {

  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle({ body }: Controller.Request<SignUpBody>):
    Promise<Controller.Response<SignUpController.Response>>{

    const { account }  = body;

    const result = await this.signUpUseCase.execute({
      email: account.email,
      password: account.password,
    });

    return {
      statusCode: 201,
      body: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
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
