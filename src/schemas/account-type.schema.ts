import { z } from 'zod'

export const accountTypeSchema = z.object({
  accountType: z.enum(['personal', 'business'] as const, {
    message: 'Please select an account type',
  }),
})

export type AccountTypeFormData = z.infer<typeof accountTypeSchema>
