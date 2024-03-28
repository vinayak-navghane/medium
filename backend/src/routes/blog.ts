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

// blogRouter.use('/*',(c,next)=>{
//     //extract thge userid 
//     // pass it down to route handler
//     next(); 
// })

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: 1
        }
    })

    return c.json(
        {
            id: blog.id
        })
})

blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json(
        {
            id: blog.id
        })
})


blogRouter.get('/', (c) => {
    return c.text('Hello Hono2222!')
})

blogRouter.put('/bulk', (c) => {
    return c.text('Hello Hono!')
})