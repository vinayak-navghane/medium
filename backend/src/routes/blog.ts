import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from '@vinayak-navghane/medium-common'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId : string
    }
}>();

blogRouter.use('/*',async (c,next)=>{
    const authHeader = c.req.header("Authorization") || "";

    try{
        const user = await verify(authHeader,c.env.JWT_SECRET)

    if(user){
        c.set("userId",user.id);
        await next();
    }
    else{
        c.status(403)
        return c.json({
            message:'You are not logged in'
        })
    }
    }
    catch(e){
        c.status(403)
        return c.json({
            message:'You are not logged in'
        })
    }
   

})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs are not correct!"
        })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
            Date: body.Date,
        }
    })

    return c.json(
        {
            id: blog.id
        })
})

blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs are not correct"
        })
    }
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

    return c.json({
            id: blog.id
        })
})

//add pagination here
blogRouter.get('/bulk', async(c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
   const blogs =  await prisma.blog.findMany({
     select:{
        Date : true,
        content:true,
        title:true,
        id:true,
        author: {
            select : {
                name:true
            }
        }
     }
   });

     return c.json({
        blogs
     })
})

blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id:Number(id)
            },
            select:{
                Date : true,
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })
    
        return c.json({
                blog        
            })
    }
    catch(e){
        c.status(411)
        return c.json({
        message :'error while fetching blog post'        
        })
    }

    
})


  

    