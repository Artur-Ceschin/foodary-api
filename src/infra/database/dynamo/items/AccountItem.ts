import { Account } from 'src/applications/entities/Account';

export class AccountItem {

  private readonly type = 'Account';
  private readonly keys: AccountItem.Keys;

  constructor(readonly attrs: AccountItem.Attributes) {

    this.keys = {
      PK: AccountItem.getPK(attrs.id),
      SK: AccountItem.getSK(attrs.id),
      GS1PK: AccountItem.getGS1PK(attrs.id),
      GS1SK: AccountItem.getGS1SK(attrs.id),
    };
  }

  static fromEntity(account: Account) {
    return new AccountItem({
      ...account,
      createdAt: account.createdAt.toISOString(),
    });
  }

  toItem(): AccountItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: this.type,
    };
  }

  static getPK(accountId: string): AccountItem.Keys['PK']  {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): AccountItem.Keys['SK']  {
    return `ACCOUNT#${accountId}`;
  }

  static getGS1PK(email: string): AccountItem.Keys['GS1PK']  {
    return `ACCOUNT#${email}`;
  }

  static getGS1SK(email: string): AccountItem.Keys['GS1SK'] {
    return `ACCOUNT#${email}`;
  }
}

export namespace AccountItem {
  export type Keys = {
    PK: `ACCOUNT#${string}`
    SK: `ACCOUNT#${string}`
    GS1PK: `ACCOUNT#${string}`
    GS1SK: `ACCOUNT#${string}`
  }

  export type Attributes = {
    id: string
    email: string
    externalId: string
    createdAt: string
  }

  export type ItemType = Keys & Attributes & {
    type: 'Account'
  }
}
