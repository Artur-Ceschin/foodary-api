import z from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    password: z.string().min(8, 'Password should be at least 8 characters long'),
    email: z.email('Invalid email'),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>
