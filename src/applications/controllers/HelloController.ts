
import { Controller } from '../contracts/Controller';
import { SignUpUseCase } from '../usecases/auth/SignUpUseCase';
import { HelloBody } from './schemas/HelloSchema';

export class SignUpController extends Controller<unknown> {

  constructor(private signUpUseCase: SignUpUseCase) {
    super();
  }

  protected async handle(
    request: Controller.Request<HelloBody>):
    Promise<Controller.Response<unknown>> {

    const result = await this.signUpUseCase.execute({
      email: request.body.email,
      password: request.body.password
    });

    return {
      statusCode: 200,
      body: {
        result,
      },
    };
  }
}
