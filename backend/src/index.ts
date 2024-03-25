import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string
  }
}>()

app.post('/api/v1/user/signup', async(c) => {

  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

try{
  const user = await prisma.user.create({
    data:{
      username : body.username,
      password : body.password,
      name : body.name
    }
  })
    const jwt = await sign({
      id: user.id
    },c.env.JWT_SECRET);

    return c.text(jwt)
} catch(e){
  c.status(411);
  return c.text('Invalid')
}

})

app.post('/api/v1/user/signin', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  return c.text('Hello Hono!')
})


app.post('/api/v1/blog', (c) => {
  return c.text('Hello Hono22!')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})


app.get('/api/v1/blog', (c) => {
  return c.text('Hello Hono2222!')
})

app.put('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})
export default app


