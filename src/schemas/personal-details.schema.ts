import { z } from 'zod'

export const nameSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
})

export type NameFormData = z.infer<typeof nameSchema>
