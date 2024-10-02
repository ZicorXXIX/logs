import Avatar from "../ui/Avatar"
import { Link } from "react-router-dom";
// import { formatDate } from "../utils/FormatDate";
interface BlogCardProps {
   title: string;
   content: string;
   author: {
         name: string;
   };
   published: Date;
   authorId?: string;
   id: string;
}
export default function BlogCard({title, content, author, published, authorId, id}: BlogCardProps) {
    // const publishedDate = formatDate(published);
    const publishedDate = published;
    return <>
    
    {/* <div className="flex justify-center max-w-xxl"> */}
    <div className="flex justify-between px-7">
        <section>
            <div className="flex items-center whitespace-nowrap">
                <Avatar name={author.name || "Anonymous"} size={6} />
                <div className="ml-2">
                    <h2 className="text-sm font-medium">{author.name || "Anonymous"} •</h2>
                </div>
                <span className="text-sm text-black/70"> {"  " + publishedDate}</span>
            </div>
            <div className="mt-2">
                <h1 className="text-lg font-bold font-sans text-black">
                    {title}
                </h1>
                <p className="text-black/80" dangerouslySetInnerHTML={{__html: content.slice(0, 160)+"..." || ""}}>
                </p>
                <div className="pt-6">
                    <span className="text-sm text-black/70 mt-6"> 3 min read</span>
                </div>
            </div>
        </section>


            {/* <div className="md:flex md:justify-end max-w-[125px] min-w-[125px] h-[125px] bg-custom-white hidden">
                <img 
                    className="rounded-lg h-full w-full object-cover p-2"
                    src="https://picsum.photos/id/237/200/200" 
                />
            </div> */}
            <div className="md:flex md:justify-end max-w-[125px] min-w-[125px] h-[125px] bg-custom-white hidden">
                <div className="flex flex-col justify-center items-center h-full w-full shadow rounded-2xl cursor-pointer">
                    <label htmlFor={`image-upload-${id}`}>
                        <div className="flex flex-col items-center cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                            <span className="text-sm text-gray-500">Upload Image</span>
                        </div>
                        <input
                        id={`image-upload-${id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        //   onChange={handleImageUpload}
                        />
                    </label>
                </div>
            </div>
    </div>
    {/* </div> */}
    <hr className="h-px my-8 bg-gray-300 border-0"></hr>

    </>
}