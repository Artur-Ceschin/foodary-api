import z from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    password: z.string().min(8, '"password" should be at least 8 characters long'),
    email: z.email('Invalid email').min(1, '"email" is required'),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>
