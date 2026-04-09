import z from 'zod';

export const signInSchema = z.object({
  password: z.string().min(8, 'Password should be at least 8 characters long'),
  email: z.email('Invalid email'),
});

export type SignInBody = z.infer<typeof signInSchema>
