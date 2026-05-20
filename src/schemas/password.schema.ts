import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8,          'Must be at least 8 characters')
      .regex(/[A-Z]/,  'Must contain at least one uppercase letter')
      .regex(/\d/,     'Must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type PasswordFormData = z.infer<typeof passwordSchema>
