import z from 'zod';

export const helloSchema = z.object({
  account: z.object({
    name: z.string('Invalid name').min(1, 'Name is required'),
  }),
  email: z.email('Invalid email'),
});

export type HelloBody = z.infer<typeof helloSchema>
