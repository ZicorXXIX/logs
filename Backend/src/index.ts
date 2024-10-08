
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

app.use(cors({
  origin: '*',
  credentials: true
}))

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)



export default app
