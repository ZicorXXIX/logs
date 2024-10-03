import { Link, useParams } from "react-router-dom";
import { useBlog } from "../hooks/index";
import Avatar from "../ui/Avatar";


export default function BlogContent() {
    const { id } = useParams();
    const { loading, blog } = useBlog(id || "");
    // const publishedDate = formatDate(blog?.published || new Date());
    if(loading) return <Skeleton />

    // const published = blog?.published.toString()
    return <>        
        <h1 className="text-3xl text-black font-thin font-serif">{blog?.title}</h1>
        <div className="flex items-center mt-6">
            <Avatar name="John Doe" size="large" />
            <div className="pl-4">
                <span className="text-sm text-black font-medium">{blog?.author.name}</span>
                <span className="text-sm text-black font-medium"> · </span>
                <Link to="#" className="text-sm text-light-red font-medium">Follow</Link>
                <p className="text-sm text-black/70 font-normal">4 min read · </p>
            </div>
        </div>
        <hr className="h-px my-8 bg-gray-300 border-0"></hr>   
                
        <div className="prose text-lg font-serif mt-6" dangerouslySetInnerHTML={{__html: blog?.content || ""}}>
            {/* {blog?.content}                     */}
        </div>
    </>
}

function Skeleton() {
    return <>
        
    <div role="status" className="animate-pulse">
        <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5"></div>
        <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
        <div className="flex items-center mt-4">
        <svg className="w-10 h-10 me-3 text-gray-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-300 rounded-full "></div>
        </div>
    </div>

    <hr className="h-px my-8 bg-gray-300 border-0"></hr> 
        <ParagraphSkeleton />
        <ParagraphSkeleton />
        <ParagraphSkeleton />   
    
        <span className="sr-only">Loading...</span>
    </div>

    </>
}

function ParagraphSkeleton() {
    return <>
    <div role="status" className="space-y-2.5 animate-pulse max-w-xlg mt-4">
        <div className="flex items-center w-full max-w-[800px]">
            <div className="h-2.5 bg-gray-200 rounded-full  w-32"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-24"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[480px]">
            <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[300px]">
            <div className="h-2.5 bg-gray-300 rounded-full  w-full"></div>
            <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[500px]">
            <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-24"></div>
        </div>
        <div className="flex items-center w-full max-w-[440px]">
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-32"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-24"></div>
            <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
        </div>
        <div className="flex items-center w-full max-w-[200px]">
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
            <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full  w-full"></div>
        </div>
    </div></>
}