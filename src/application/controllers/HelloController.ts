import { Schema } from '@kernel/decorators/schema';
import { Controller } from '@application/contracts/Controller';
import { helloSchema, HelloSchema } from './schemas/helloSchema';
import { HelloUseCase } from '@application/usecases/HelloUseCase';
import { Injectable } from '@kernel/decorators/injectable';
@Injectable()
@Schema(helloSchema)
export class HelloController extends Controller<unknown> {

  constructor(private readonly helloUseCase: HelloUseCase) {
    super();
  }

  protected override async handle(
    request: Controller.Request<HelloSchema>):
    Promise<Controller.Response<unknown>>{

    console.log('Hello Controller');

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
