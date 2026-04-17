import 'reflect-metadata';

import { Registry } from '@kernel/di/Registry';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import { ConfirmForgotPasswordController } from 'src/applications/controllers/auth/ConfirmForgotPasswordController';

const controller = Registry.getInstance().resolve(ConfirmForgotPasswordController);

export const handler = lambdaHttpAdapter(controller);
