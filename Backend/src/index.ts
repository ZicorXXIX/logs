import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'



const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  },
  Variables: {
    prisma: any
  }
}>()

app.use(cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)


export default app