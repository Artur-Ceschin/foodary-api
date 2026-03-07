
import { Schema } from '@kernel/decorators/Schema';
import { Controller } from '../contracts/Controller';
import { helloSchema, HelloBody } from './schemas/HelloSchema';
import { HelloUseCase } from '../usecases/HelloUseCase';

@Schema(helloSchema)
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
