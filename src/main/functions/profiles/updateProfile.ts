import 'reflect-metadata';

import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import { UpdateProfileController } from '@applications/controllers/profiles/UpdateProfileController';

const controller = Registry.getInstance().resolve(UpdateProfileController);

export const handler = lambdaHttpAdapter(controller);
