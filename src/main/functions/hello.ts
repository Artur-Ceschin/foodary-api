import 'reflect-metadata';
import { HelloController } from '@application/controllers/HelloController';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHtppAdapter';

const controller = new HelloController();

export const handler = lambdaHttpAdapter(controller);
