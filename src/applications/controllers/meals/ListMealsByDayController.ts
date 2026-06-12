
import { Injectable } from '@kernel/decorators/Injectable';
import { Controller } from 'src/applications/contracts/Controller';
import { Meal } from '@applications/entities/Meal';
import { listMealsByDaySchema } from './schemas/listMealsByDaySchema';
import { ListMealsByDayQuery } from '@applications/query/ListMealsByDayQuery';

@Injectable()
export class ListMealsByDayController extends Controller<'private', ListMealsByDayController.Response> {
  constructor(private readonly listMealsByDayQuery: ListMealsByDayQuery) {
    super();
  }

  protected override async handle({
    accountId,
    queryParams,
  }: Controller.Request<'private'>):
    Promise<Controller.Response<ListMealsByDayController.Response>> {

    const { date } = listMealsByDaySchema.parse(queryParams);

    const { meals } = await this.listMealsByDayQuery.execute({
      accountId,
      date,
    });

    return {
      statusCode: 200,
      body: {
        meals,
      },
    };
  }
}

export namespace ListMealsByDayController {
  export type Response = {
    meals: {
      id: string;
      createdAt: string;
      name: string;
      icon: string;
      foods: Meal.Food[];
    }[]
  }
}
