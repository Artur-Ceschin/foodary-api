
import { Injectable } from '@kernel/decorators/Injectable';
import { Controller } from 'src/applications/contracts/Controller';
import { UpdateProfileUseCase } from '@applications/usecases/profiles/UpdateProfileUseCase';
import { UpdateProfileBody, updateProfileSchema } from './schema/updateProfileSchema';
import { Schema } from '@kernel/decorators/Schema';

@Injectable()
@Schema(updateProfileSchema)
export class UpdateProfileController extends Controller<'private', UpdateProfileController.Response> {
  constructor(private readonly updateProfileUseCase: UpdateProfileUseCase) {
    super();
  }

  protected override async handle({
    accountId,
    body,
  }: Controller.Request<'private', UpdateProfileBody>):
    Promise<Controller.Response<UpdateProfileController.Response>> {

    const {
      birthDate,
      name,
      weight,
      height,
      gender,
    } = body;

    await this.updateProfileUseCase.execute({
      accountId,
      birthDate,
      name,
      weight,
      height,
      gender,
    });

    return {
      statusCode: 204,
    };
  }
}

export namespace UpdateProfileController {
  export type Response = null
}
