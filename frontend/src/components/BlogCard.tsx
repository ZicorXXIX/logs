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
   authorId: string;
   id: string;
}
export default function BlogCard({title, content, author, published, authorId, id}: BlogCardProps) {
    // const publishedDate = formatDate(published);
    const publishedDate = published;
    return <>
    <Link to={`/blogs/${id}`}>
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
                <p className="text-black/80">
                    {content}
                </p>
                <div className="pt-6">
                    <span className="text-sm text-black/70 mt-6"> 3 min read</span>
                </div>
            </div>
        </section>


            <div className="md:flex md:justify-end max-w-[125px] min-w-[125px] h-[125px] bg-custom-white hidden">
                <img 
                    className="rounded-lg h-full w-full object-cover p-2"
                    src="https://picsum.photos/id/237/200/200" 
                />
            </div>
    </div>
    {/* </div> */}
    <hr className="h-px my-8 bg-gray-300 border-0"></hr>
    </Link>
    </>
}