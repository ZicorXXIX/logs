import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/index";
import BlogCard from "../components/BlogCard";


export default function PreviewBlog(){
    const location = useLocation();
    const { user } = useAuth();
    const { title, content } = location.state;
    return <>
        <Navbar />
        <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
        <BlogCard
                     title={title} 
                     content={content} 
                     author={{name:user}} 
                     published={Date.now()} 
                    //  id={blog.id}
                  />      
        </div>
    </>
}