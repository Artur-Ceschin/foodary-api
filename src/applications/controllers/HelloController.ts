import z from 'zod';
import type { IController } from '../contracts/Controller.js';

const schema = z.object({
  account: z.object({
    name: z.string('Invalid name').min(1, 'Name is required'),
  }),
  email: z.email('Invalid email'),
});

export class HelloController implements IController<unknown> {
  async handle(request: IController.Request): Promise<IController.Response<unknown>> {

    const body = schema.parse(request.body);

    return {
      statusCode: 200,
      body: {
        body,
      },
    };
  }
}
