import { z } from 'zod'

export const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number'),
})

export type MobileFormData = z.infer<typeof mobileSchema>
