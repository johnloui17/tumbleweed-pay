import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Must be atleast 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Both passwords must match',
    path: ['confirmPassword'],
  })

export type PasswordFormData = z.infer<typeof passwordSchema>
