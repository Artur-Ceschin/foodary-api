
import { Schema } from '../../kernel/decorators/Schema';
import { Controller } from '../contracts/Controller';
import { HelloBody, helloSchema } from './schemas/HelloSchema';

@Schema(helloSchema)
export class HelloController extends Controller<unknown> {
  protected async handle(
    request: Controller.Request<HelloBody>):
    Promise<Controller.Response<unknown>> {
    return {
      statusCode: 200,
      body: {
        parsedBody: request.body,
      },
    };
  }
}
