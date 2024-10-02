import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/index";
// import BlogCard from "../components/BlogCard";
import PreviewBlogCard from "../components/PreviewBlogCard";



export default function PreviewBlog(){
    const location = useLocation();
    const { user } = useAuth();
    const { title, content } = location.state;

    return <>

        <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
        <PreviewBlogCard title={title} content={content}   author={{name: user}} published={new Date()} />    
        </div>
    </>
}