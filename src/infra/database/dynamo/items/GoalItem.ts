import { Goal } from 'src/applications/entities/Goal';
import { AccountItem } from './AccountItem';

export class GoalItem {

  static readonly type = 'Goal';
  private readonly keys: GoalItem.Keys;

  constructor(readonly attrs: GoalItem.GoalItem) {

    this.keys = {
      PK: GoalItem.getPK(attrs.accountId),
      SK: GoalItem.getSK(attrs.accountId),
    };
  }

  static fromEntity(goal: Goal) {
    return new GoalItem({
      ...goal,
      createdAt: goal.createdAt.toISOString(),
    });
  }

  static toEntity(goalItem: GoalItem.ItemType) {
    return new Goal({
      accountId: goalItem.accountId,
      proteins: goalItem.proteins,
      calories: goalItem.calories,
      carbohydrates: goalItem.carbohydrates,
      fats: goalItem.fats,
      createdAt: new Date(goalItem.createdAt),
    });
  }

  toItem(): GoalItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: GoalItem.type,
    };
  }

  static getPK(accountId: string): GoalItem.Keys['PK']  {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): GoalItem.Keys['SK']  {
    return `ACCOUNT#${accountId}#GOAL`;
  }
}

export namespace GoalItem {
  export type Keys = {
    PK: AccountItem.Keys['PK']
    SK: `ACCOUNT#${string}#GOAL`
  }

  export type GoalItem = {
    accountId: string
    calories: number;
    proteins: number;
    carbohydrates: number
    fats: number;
    createdAt: string
  }

  export type ItemType = Keys & GoalItem & {
    type: 'Goal'
  }
}
