
import { Injectable } from '@kernel/decorators/Injectable';
import { Controller } from 'src/applications/contracts/Controller';
import { Meal } from '@applications/entities/Meal';
import { GetMealByIdUseCase } from '@applications/usecases/meals/GetMealByIdUseCase';

@Injectable()
export class GetMealByIdController extends Controller<'private', GetMealByIdController.Response> {
  constructor(private readonly getMealByIdUseCase: GetMealByIdUseCase) {
    super();
  }

  protected override async handle({
    accountId,
    params,
  }: GetMealByIdController.Request):
    Promise<Controller.Response<GetMealByIdController.Response>> {

    const { mealId }= params;

    const { meal } = await this.getMealByIdUseCase.execute({
      accountId,
      mealId,
    });

    return {
      statusCode: 200,
      body: {
        meal,
      },
    };
  }
}

export namespace GetMealByIdController {
  export type Params = {
    mealId: string
  }

  export type Request = Controller.Request<
    'private', Record<string, unknown>, GetMealByIdController.Params
  >

  export type Response = {
    meal: {
      id: string
      accountId: string
      status: Meal.Status;
      inputType: Meal.InputType;
      inputFileURL: string;
      name: string;
      icon: string;
      foods: Meal.Food[];
      createdAt: Date
    }
  }
}
