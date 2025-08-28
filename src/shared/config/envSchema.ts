import z from 'zod';

// export const envSchema = z.object({
//   COGNITO_CLIENT_ID: z.string().min(1),
//   COGNITO_CLIENT_SECRET: z.string().min(1),
// });

// function getEnv() {
//   try {
//     return envSchema.parse(process.env);
//   } catch(error) {
//     if (error instanceof ZodError) {
//       throw new Error(JSON.stringify(error, null, 2));
//     }

//     throw error;
//   }
// }

// export const env = getEnv();
export const schema = z.object({
  COGNITO_CLIENT_ID: z.string().min(1),
  COGNITO_CLIENT_SECRET: z.string().min(1),
});

export const env = schema.parse(process.env);
