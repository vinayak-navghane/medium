import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/user/signup', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signin', (c) => {
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


