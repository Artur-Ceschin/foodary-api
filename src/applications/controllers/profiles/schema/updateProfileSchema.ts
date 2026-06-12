
import { Profile } from 'src/applications/entities/Profile';
import z from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(1, '"name" is required'),
  birthDate: z.iso.date('birthDate should be a valid date (YYYY-MM-DD)')
    .min(1, '"birthDate" is required')
    .transform(date => new Date(date)),
  height: z.number().min(1, '"height is required"'),
  weight: z.number().min(1, '"weight is required"'),
  gender: z.enum(Profile.Gender),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>
