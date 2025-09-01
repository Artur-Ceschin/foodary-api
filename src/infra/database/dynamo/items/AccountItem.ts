import { Account } from '@application/entities/Account';

export class AccountItem {
  private readonly type = 'Account';

  private readonly keys: AccountItem.Keys;

  constructor(readonly attrs: AccountItem.Attributes) {

    this.keys = {
      PK: AccountItem.getPk(this.attrs.id),
      SK: AccountItem.getSk(this.attrs.id),
      GSI1PK: AccountItem.getGsi1Pk(this.attrs.email),
      GSI1SK: AccountItem.getGsi1Sk(this.attrs.email),
    };
  }

  toItem(): AccountItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: this.type,
    };
  }

  static fromEntity(account: Account) {
    return new AccountItem({
      ...account,
      createdAt: account.createdAt.toISOString(),
    });
  }

  static getPk(accountId: string): AccountItem.Keys['PK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getSk(accountId: string): AccountItem.Keys['SK'] {
    return `ACCOUNT#${accountId}`;
  }

  static getGsi1Pk(email: string): AccountItem.Keys['GSI1PK'] {
    return `ACCOUNT#${email}`;
  }

  static getGsi1Sk(email: string): AccountItem.Keys['GSI1SK'] {
    return `ACCOUNT#${email}`;
  }
}

export namespace AccountItem {

  export type Keys = {
    PK: `ACCOUNT#${string}`;
    SK: `ACCOUNT#${string}`;
    GSI1PK: `ACCOUNT#${string}`;
    GSI1SK: `ACCOUNT#${string}`;
  }

  export type Attributes = {
    id: string;
    email: string;
    externalId: string;
    createdAt: string;
  };

  export type ItemType = Keys & Attributes & {
    type: 'Account';
  };
}
