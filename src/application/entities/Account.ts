import ksuid from 'ksuid';

export class Account {

  readonly id: string;
  readonly email: string;
  readonly externalId: string;
  readonly createdAt: Date;

  constructor(attrs: Account.Attributes) {
    this.id = attrs.id || ksuid.randomSync().string;
    this.email = attrs.email;
    this.externalId = attrs.externalId;
    this.createdAt = attrs.createdAt || new Date();
  }
}

export namespace Account {
  export type Attributes = {
    email: string;
    externalId: string;
    id?: string;
    createdAt?: Date;
  };
}
