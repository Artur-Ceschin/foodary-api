import { Profile } from 'src/applications/entities/Profile';
import z from 'zod';

export const signUpSchema = z.object({
  account: z.object({
    password: z.string().min(8, '"password" should be at least 8 characters long'),
    email: z.email('Invalid email').min(1, '"email" is required'),
  }),
  profile: z.object({
    name: z.string().min(1, '"name" is required'),
    birthDate: z.iso.date('birthDate should be a valid date (YYYY-MM-DD)')
      .min(1, '"birthDate" is required')
      .transform(date => new Date(date)),
    gender: z.enum(Profile.Gender),
    height: z.number().min(1, '"height is required"'),
    weight: z.number().min(1, '"weight is required"'),
    activityLevel: z.enum(Profile.ActivityLevel),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>
