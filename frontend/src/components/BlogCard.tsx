import Avatar from "../ui/Avatar"
export default function BlogCard() {
    return <>
    {/* <div className="flex justify-center max-w-xxl"> */}
    <div className="flex">
        <section className="col-span-2">
            <div className="flex items-center whitespace-nowrap">
                <Avatar name="John Doe" w="6" h="6" />
                <div className="ml-2">
                    <h2 className="text-sm font-medium">John Doe •</h2>
                </div>
                <span className="text-sm text-black/70"> {' '}12th July 2021</span>
            </div>
            <div className="mt-2">
                <h1 className="text-lg font-bold font-sans text-black">
                How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing
                </h1>
                <p className="text-black/80">
                No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for man...
                </p>
                <div className="pt-6">
                    <span className="text-sm text-black/70 mt-6"> 3 min read</span>
                </div>
            </div>
        </section>


            <div className="max-w-[125px] min-w-[125px] h-[125px] col-span-1 bg-custom-white hidden md:block mt-2">
                <img 
                    className="rounded-lg h-full w-full object-cover p-2"
                    src="https://picsum.photos/id/237/200/200" 
                />
            </div>
    </div>
    {/* </div> */}
    <hr className="h-px my-8 bg-gray-300 border-0"></hr>
    
    </>
}