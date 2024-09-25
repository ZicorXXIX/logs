import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostSchema, updatePostSchema } from "@zicor/medium-common";

const EXPIRE_TIME = Math.floor(Date.now() / 1000) + 60 * 60 * 2;

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables: {
        prisma : any,
        userId : any
    }
}>();

blogRouter.use('*', async (c, next) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    c.set("prisma", prisma)
    
    //Authenticating user
    try {
        const header = c.req.header('Authorization') as string;
        const token = header.split(" ")[1];
        const decoded = await verify(token, c.env.JWT_SECRET)
        c.set("userId", decoded.id)
        await next()
    } catch (error) {
        return c.json({error: "Unauthorized access"})   
    }
})

//   id        String  @id @default(cuid())
//   title     String
//   content   String?
//   published Boolean @default(false)
//   author    User    @relation(fields: [authorId], references: [id])
//   authorId  String
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostSchema.safeParse(body);
    if(!success){
        return c.json({
            error: "Invalid Input"
        })
    }
    const userId = c.get("userId");
    const prisma = c.get("prisma");
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        })
    
        return c.json({
            id: blog.id
        })
    } catch (error) {
        return c.text("Error creating blog")
    }
        
})

//Update Blog
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostSchema.safeParse(body);
    const prisma = c.get("prisma");
    const blog = await prisma.blog.update({
        where: {
            id: body.id
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

blogRouter.get('/bulk', async (c) => {
    const body = await c.req.json();
    const prisma = c.get("prisma");
    const blogs = await prisma.blog.findMany()

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id')
    const prisma = c.get("prisma");
    const blog = await prisma.blog.findFirst({
        where: {
            id: id
        }        
    })

    return c.json({
        blog
    })
})
