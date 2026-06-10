import { Meal } from '@applications/entities/Meal';
import { ResourceNotFound } from '@applications/errors/application/ResourceNotFound';
import { MealRepository } from '@infra/database/dynamo/repositories/MealRepository';
import { Injectable } from '@kernel/decorators/Injectable';

@Injectable()
export class GetMealByIdUseCase {

  constructor(private readonly mealRepository: MealRepository){}

  async execute({
    mealId,
    accountId,
  }: GetMealByIdUseCase.Input): Promise<GetMealByIdUseCase.OutPut> {

    const meal = await this.mealRepository.findById({ accountId, mealId });

    if(!meal) {
      throw new ResourceNotFound('Meal not found.');
    }

    return {
      meals: {
        accountId: meal.accountId,
        status: meal.status,
        id: meal.id,
        inputType: meal.inputType,
        inputFileKey: meal.inputFileKey,
        name: meal.name,
        icon: meal.icon,
        foods: meal.foods,
        createdAt: meal.createdAt,
      },
    };
  }

}

export namespace GetMealByIdUseCase {

  export type Input = {
    mealId: string;
    accountId:string
  }

  export type OutPut = {
    meals: {
      id: string
      accountId: string
      status: Meal.Status;
      inputType: Meal.InputType;
      inputFileKey: string;
      name: string;
      icon: string;
      foods: Meal.Food[];
      createdAt: Date
    }
  }
}
