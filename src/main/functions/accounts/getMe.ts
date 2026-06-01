import 'reflect-metadata';

import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import { GetMeController } from '@applications/controllers/accounts/GetMeController';

const controller = Registry.getInstance().resolve(GetMeController);

export const handler = lambdaHttpAdapter(controller);
