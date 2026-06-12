import 'reflect-metadata';

import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import { UpdateGoalController } from '@applications/controllers/goals/UpdateGoalController';

const controller = Registry.getInstance().resolve(UpdateGoalController);

export const handler = lambdaHttpAdapter(controller);
