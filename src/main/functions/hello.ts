import 'reflect-metadata';

import { HelloController } from '../../applications/controllers/HelloController.js';
import { lambdaHttpAdapter } from '../adapters/lambdaHttpAdapter.js';

const controller = new HelloController();

export const handler = lambdaHttpAdapter(controller);
