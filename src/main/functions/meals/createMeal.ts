import 'reflect-metadata';

import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import { CreateMealController } from 'src/applications/controllers/meals/CreateMealController';

const controller = Registry.getInstance().resolve(CreateMealController);

export const handler = lambdaHttpAdapter(controller);
