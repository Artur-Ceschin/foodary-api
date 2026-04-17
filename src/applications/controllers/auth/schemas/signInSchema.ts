import z from 'zod';

export const signInSchema = z.object({
  password: z.string().min(8, '"password" should be at least 8 characters long'),
  email: z.email('Invalid email').min(1, '"email" is required'),
});

export type SignInBody = z.infer<typeof signInSchema>
