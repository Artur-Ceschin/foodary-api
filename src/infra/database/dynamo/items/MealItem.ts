import { Meal } from 'src/applications/entities/Meal';

export class MealItem {

  static readonly type = 'Meal';
  private readonly keys: MealItem.Keys;

  constructor(readonly attrs: MealItem.Attributes) {
    this.keys = {
      PK: MealItem.getPK(attrs.id),
      SK: MealItem.getSK(attrs.id),
      GSI1PK: MealItem.getGSI1PK({
        accountId: attrs.accountId,
        createdAt: new Date(attrs.createdAt),
      }),
      GSI1SK: MealItem.getGSI1SK(attrs.id),
    };
  }

  static fromEntity(meal: Meal) {
    return new MealItem({
      ...meal,
      createdAt: meal.createdAt.toISOString(),
    });
  }

  static toEntity(mealItem: MealItem.ItemType) {
    return new Meal({
      id: mealItem.id,
      accountId: mealItem.accountId,
      inputFileKey: mealItem.inputFileKey,
      inputTye: mealItem.inputTye,
      status: mealItem.status,
      name: mealItem.name,
      icon: mealItem.icon,
      attempts: mealItem.attempts,
      foods: mealItem.foods,
      createdAt: new Date(mealItem.createdAt),
    });
  }

  toItem(): MealItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: MealItem.type,
    };
  }

  static getPK(mealId: string): MealItem.Keys['PK']  {
    return `MEAL#${mealId}`;
  }

  static getSK(mealId: string): MealItem.Keys['SK']  {
    return `MEAL#${mealId}`;
  }

  static getGSI1PK({ accountId, createdAt }: MealItem.GS1PKParams): MealItem.Keys['GSI1PK']  {
    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const day = createdAt.getDay();

    return `MEALS#${accountId}#${year}-${month}-${day}`;
  }

  static getGSI1SK(mealId: string): MealItem.Keys['GSI1SK'] {
    return `MEALS#${mealId}`;
  }
}

export namespace MealItem {
  export type Keys = {
    PK: `MEAL#${string}`
    SK: `MEAL#${string}`
    GSI1PK: `MEALS#${string}#${string}-${string}-${string}`
    GSI1SK: `MEALS#${string}`
  }

  export type Attributes = {
    id: string
    accountId: string
    status: Meal.Status;
    attempts: number;
    inputTye: Meal.InputType;
    inputFileKey: string;
    name: string;
    icon: string;
    foods: Meal.Food[];
    createdAt: string
  }

  export type ItemType = Keys & Attributes & {
    type: 'Meal'
  }

  export type GS1PKParams = {
    accountId: string
    createdAt: Date
  }
}
