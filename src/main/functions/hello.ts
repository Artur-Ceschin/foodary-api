import 'reflect-metadata';

import { HelloController } from '../../applications/controllers/HelloController.js';
import { lambdaHttpAdapter } from '../adapters/lambdaHttpAdapter.js';
import { HelloUseCase } from 'src/applications/usecases/HelloUseCase.js';

const controller = new HelloController(new HelloUseCase);

export const handler = lambdaHttpAdapter(controller);
