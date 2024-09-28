import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import {useState} from 'react';


interface BlogProps {
   title: string;
   content: string;
   author: string;
   publishedDate: string;
}

export default  function Blog()  {
   const [activeTab, setActiveTab] = useState('for-you');
   return (
      <>
         
            <Navbar />
            <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
               <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>
               <BlogCard />
            </div>

            {/* <h1>Blog</h1> */}

         
      </>
   )
}