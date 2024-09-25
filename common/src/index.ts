import z, { optional } from "zod"

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const createPostSchema = z.object({
    title: z.string(),
    content: z.string(),
})

export const updatePostSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),    
})
export type SignupSchema = z.infer<typeof signupSchema>
export type SigninSchema = z.infer<typeof signinSchema>
export type PostSchema = z.infer<typeof createPostSchema>
export type UpdatePostSchema = z.infer<typeof updatePostSchema>