import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import React, {useState} from 'react';
import {useBlogs} from '../hooks/index';
import { Link } from "react-router-dom";



function Blogs()  {
   const {loading, blogs} = useBlogs();
   console.log(blogs)
   const [activeTab, setActiveTab] = useState('for-you');
   return (
      <>         
            <Navbar />
            <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
               <Tabs activeTab={activeTab} setActiveTab={setActiveTab}/>               
               {!loading && blogs.length === 0 && <p className="text-center">No blogs available</p>}
               {loading && 
               (<>
               <Skeleton key={1}/>
               <Skeleton key={2}/>
               <Skeleton key={3} />
               <Skeleton key={4} />
               </>
               )}
               {blogs.map((blog) => (
                  <>
                  <Link to={`/blogs/${blog.id}`}>
                  <BlogCard 
                     key={blog.id} 
                     title={blog.title} 
                     content={blog.content} 
                     author={blog.author} 
                     published={blog.published} 
                     authorId={blog.authorId}
                     image={blog.image}
                  />
                  </Link>
                  </>   
               ))}
            </div>         
      </>
   )
}


function Skeleton() {
   return <>
    <div className="flex animate-pulse justify-around">
        <section className="">
            <div className="flex items-center w-full">
               <div className="flex items-center justify-center mt-4 w-full">
                  <svg className="w-10 h-10 text-gray-300 me-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                  <div className="w-[420px] h-2.5 bg-gray-300 rounded-full me-3"></div>
                  <div className="w-24 h-2 bg-gray-300 rounded-full"></div>
               </div>
            </div>
            <div className="mt-2">
            <div className="h-2.5 bg-gray-300 rounded-full  max-w-[640px] mb-2.5"></div>
            <div className="h-2.5  bg-gray-300 rounded-full max-w-[540px]"></div>
                <div className="pt-6">
                  <div className="w-20 h-2.5 bg-gray-300 rounded-full me-3"></div>
                </div>
            </div>
        </section>


            <div className=" ml-24 max-w-[125px] min-w-[125px] h-[125px] max-h-[125px] col-span-1 bg-custom-white hidden md:block mt-2">
            <div className="flex items-center justify-center h-full w-full object-cover p-2 mb-4 bg-gray-300 rounded  ">
               <svg className="w-10 h-10 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                     <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                     <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
               </svg>
    </div>
            </div>
    </div>
    {/* </div> */}
    <hr className="h-px my-8 bg-gray-300 border-0"></hr>
   </>
}



export default React.memo(Blogs);