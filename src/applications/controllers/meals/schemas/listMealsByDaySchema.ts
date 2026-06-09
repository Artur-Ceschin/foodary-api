import z from 'zod';

export const listMealsByDaySchema = z.object({
  date: z.iso.date('date should be a valid date (YYYY-MM-DD)')
    .min(1, '"date" is required')
    .transform(date => new Date(date)),
});

export type ListMealsByIdBody = z.infer<typeof listMealsByDaySchema>
