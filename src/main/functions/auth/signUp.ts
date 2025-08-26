import 'reflect-metadata';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHtppAdapter';
import { Registry } from '@kernel/di/Registry';
import { SignUpController } from '@application/controllers/SignUpController';

const controller = Registry.getInstance().resolve(SignUpController);

export const handler = lambdaHttpAdapter(controller);
