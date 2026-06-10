import 'reflect-metadata';

import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import { GetMealByIdController } from '@applications/controllers/meals/GetMealByIdController';

const controller = Registry.getInstance().resolve(GetMealByIdController);

export const handler = lambdaHttpAdapter(controller);
