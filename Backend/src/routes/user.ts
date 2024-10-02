import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify} from "hono/jwt";
import { signupSchema, signinSchema } from "@zicor/medium-common";
import {
  setCookie,
} from 'hono/cookie'

const EXPIRE_TIME = Math.floor(Date.now() / 1000) + 60 * 60 * 2;

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables: {
        prisma : any
    }
}>();

userRouter.use('*', async (c, next)=> {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate())

    c.set('prisma', prisma)    
    await next();
})

userRouter.get('/isAuth', async (c) =>{
  try {
    const header = c.req.header('Authorization') as string;
    const token = header.split(" ")[1];
    const decoded = await verify(token, c.env.JWT_SECRET)
    console.log(decoded)
    return c.json({decoded})
  } catch (error) {
      c.status(403)
      return c.json({error: "Unauthorized access"})   
  }
})

userRouter.post('/signup', async (c) => {

    const prisma = c.get("prisma")
  
    const body = await c.req.json();
    
    const { success, data, error } = signupSchema.safeParse(body);
    console.log(success, data, error);
    
    if(!success){
      c.status(403)
      return c.json({
        error: error.issues
      })
    }
  
    try {
      const newUser = await prisma.user.create({
        data: {
          email : body.email,
          name : body.name,
          password : body.password
        }
      })
      ///Math.floor(Date.now() / 1000) + 60 * 60 * 2 expires in 2hrs 
      const token = await sign({ id : newUser.id, name: newUser.name,  exp: EXPIRE_TIME} , c.env.JWT_SECRET ) 
      setCookie(c, 'jwt', token)
      return c.json({ jwt :token})
  
    } catch (e) {
      c.status(403);
      return c.json({
        error: [{message: "Error Creating User....."}]
      }) 
    }  
  })
  
userRouter.post('/login', async (c) => {
    const prisma = c.get("prisma")
    const body = await c.req.json();
    const {success, error} = signinSchema.safeParse(body);
    if(!success){
        c.status(403)
        return c.json({
          error: error.issues
        })
    }
    const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
    if(!user){
        c.status(403)
        return c.json({
        error:[ {message: "User not found or incorrect password"}]
        })
    }
    const jwt = await sign({id: user.id, name: user.name, exp: EXPIRE_TIME}, c.env.JWT_SECRET);
    setCookie(c, 'jwt', jwt)
    return c.json({jwt})
})


userRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const prisma = c.get('prisma')
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return c.json({
      user
    })
  } catch (error) {
    console.log(error) 
    c.status(403)  
    return c.json({
      error: "Error fetching User"
    }) 
  }
})