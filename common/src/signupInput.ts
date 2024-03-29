import z from 'zod'

export const signupInputs = z.object({
    username : z.string(),
    password : z.string().min(6),
    name : z.string().optional()
})

//using type inference in zod
export type SignupInput = z.infer<typeof signupInputs>