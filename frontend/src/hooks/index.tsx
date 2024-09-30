import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
    title: string;
    content: string;
    author: {
          name: string;
    };
    published: Date;
    authorId: string;
    id: string;
 }

export const useBlog = (id: string) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res)=>{
            setLoading(false)
            setBlog(res.data.blog)
            console.log(res.data)
        })

    },[])

    return {
        loading,
        blog
    }

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res)=>{
            setLoading(false)
            setBlogs(res.data.blogs)
            console.log(res.data)
        })

    },[])

    return {
        loading,
        blogs
    }
}