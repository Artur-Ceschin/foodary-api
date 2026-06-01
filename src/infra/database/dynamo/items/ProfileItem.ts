import { Profile } from 'src/applications/entities/Profile';
import { AccountItem } from './AccountItem';

export class ProfileItem {

  static readonly type = 'Profile';
  private readonly keys: ProfileItem.Keys;

  constructor(readonly attrs: ProfileItem.Attributes) {

    this.keys = {
      PK: ProfileItem.getPK(attrs.accountId),
      SK: ProfileItem.getSK(attrs.accountId),
    };
  }

  static fromEntity(profile: Profile) {
    return new ProfileItem({
      ...profile,
      createdAt: profile.createdAt.toISOString(),
      birthDate: profile.birthDate.toISOString(),
    });
  }

  static toEntity(profileItem: ProfileItem.ItemType) {
    return new Profile({
      accountId: profileItem.accountId,
      name: profileItem.name,
      weight: profileItem.weight,
      height: profileItem.height,
      gender: profileItem.gender,
      activityLevel: profileItem.activityLevel,
      birthDate: new Date(profileItem.birthDate),
      goal: profileItem.goal,
      createdAt: new Date(profileItem.createdAt),
    });
  }

  toItem(): ProfileItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: ProfileItem.type,
    };
  }

  static getPK(accountId: string): ProfileItem.Keys['PK']  {
    return `ACCOUNT#${accountId}`;
  }

  static getSK(accountId: string): ProfileItem.Keys['SK']  {
    return `ACCOUNT#${accountId}#PROFILE`;
  }
}

export namespace ProfileItem {
  export type Keys = {
    PK: AccountItem.Keys['PK']
    SK: `ACCOUNT#${string}#PROFILE`
  }

  export type Attributes = {
    accountId: string
    name: string;
    birthDate: string;
    gender: Profile.Gender;
    height: number;
    weight: number;
    goal: Profile.Goal;
    activityLevel: Profile.ActivityLevel;
    createdAt: string
  }

  export type ItemType = Keys & Attributes & {
    type: 'Profile'
  }
}
