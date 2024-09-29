import Navbar from '../components/Navbar';
import BlogContent from '../components/BlogContent';
export default function Blog() {
    return <>
        <Navbar />
        <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
            <BlogContent />
            
        </div>
    </>
}