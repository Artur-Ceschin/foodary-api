import { AccountRepository } from '@infra/database/dynamo/repositories/AccountRepository';
import { SignUpUnitOfWork } from '@infra/database/dynamo/uow/SignUpUnifOfWork';
import { Injectable } from '@kernel/decorators/Injectable';
import { Account } from 'src/applications/entities/Account';
import { Goal } from 'src/applications/entities/Goal';
import { Profile } from 'src/applications/entities/Profile';
import { EmailAlreadyInUse } from 'src/applications/errors/application/EmailAlreadyInUse';
import { AuthGateway } from 'src/infra/gateways/AuthGateway';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepository: AccountRepository,
    private readonly signUpUow: SignUpUnitOfWork,

  ){}

  async execute({ account: { email, password }, profile: profileInfo }: SignUpUseCase.Input):
  Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.accountRepository.findEmail(email);

    if(emailAlreadyInUse) {
      throw new EmailAlreadyInUse();
    }
    const account = new Account({ email });
    const profile = new Profile({ ...profileInfo, accountId: account.id });
    const goal = new Goal({
      accountId: account.id,
      calories: 3000,
      proteins: 180,
      fats: 80,
      carbohydrates: 200,
    });

    const { externalId } = await this.authGateway.signUp({
      email,
      password ,
      internalId: account.id,
    });

    account.externalId = externalId;

    await this.signUpUow.run({
      account,
      goal,
      profile,
    });

    const { accessToken, refreshToken } = await this.authGateway.signIn({ email, password });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    account: {
      email: string
      password: string
    }

    profile: {
      name: string;
      birthDate: Date;
      gender: Profile.Gender;
      height: number;
      weight: number;
      activityLevel: Profile.ActivityLevel;
    }
  }

  export type Output = {
    accessToken: string
    refreshToken: string
  }
}
