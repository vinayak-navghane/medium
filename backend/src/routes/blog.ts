import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

blogRouter.post('/', (c) => {
    return c.text('Hello Hono22!')
})

blogRouter.put('/', (c) => {
    return c.text('Hello Hono!')
})


blogRouter.get('/', (c) => {
    return c.text('Hello Hono2222!')
})

blogRouter.put('/bulk', (c) => {
    return c.text('Hello Hono!')
})