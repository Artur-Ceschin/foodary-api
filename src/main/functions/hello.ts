import 'reflect-metadata';

import { HelloController } from '../../applications/controllers/HelloController.js';
import { lambdaHttpAdapter } from '../adapters/lambdaHttpAdapter.js';
import { Registry } from '@kernel/di/Registry.js';

const controller = Registry.getInstance().resolve(HelloController);

export const handler = lambdaHttpAdapter(controller);
