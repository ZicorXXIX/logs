import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";

export default function BlogContent() {
    return <>
        <h1 className="text-3xl text-black font-thin font-serif">The Future of Web Development: AI-Driven Interfaces</h1>
        <div className="flex items-center mt-6">
            <Avatar name="John Doe" size={10} />
            <div className="pl-4">
                <span className="text-sm text-black font-medium">John Doe</span>
                <span className="text-sm text-black font-medium"> · </span>
                <Link to="#" className="text-sm text-light-red font-medium">Follow</Link>
                <p className="text-sm text-black/70 font-normal">4 min read · Jun 1, 2024</p>
            </div>
        </div>
        <hr className="h-px my-8 bg-gray-300 border-0"></hr>
        <div className="text-xl font-serif mt-6">
                    
        </div>
    </>
}