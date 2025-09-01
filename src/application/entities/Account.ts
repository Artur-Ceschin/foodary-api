import ksuid from 'ksuid';

export class Account {

  readonly id: string;
  readonly email: string;
  readonly externalId: string;
  readonly createdAt: Date;

  constructor({
    email,
    externalId,
    createdAt,
  }: Account.Attributes) {
    this.id = ksuid.randomSync().string;
    this.email = email;
    this.externalId = externalId;
    this.createdAt = createdAt;
  }
}

export namespace Account {
  export type Attributes = {
    email: string;
    externalId: string;
    createdAt: Date;
  };
}
