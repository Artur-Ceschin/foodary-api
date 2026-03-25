
import { Controller } from '../contracts/Controller';
import { HelloBody } from './schemas/HelloSchema';

export class HelloController extends Controller<unknown> {

  constructor(private helloUseCase: HelloUseCase) {
    super();
  }

  protected async handle(
    request: Controller.Request<HelloBody>):
    Promise<Controller.Response<unknown>> {

    const result = await this.helloUseCase.execute({
      email: request.body.email,
    });

    return {
      statusCode: 200,
      body: {
        result,
      },
    };
  }
}
