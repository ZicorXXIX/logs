import { Editor } from "novel-lightweight";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Placeholder } from "novel/extensions";

export default function CreateBlog() {
  const [data, setData] = useState("Tell your story here...");
  const [title, setTitle] = useState("");

  console.log(data);

  const extensions = [Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "text") {
        return `Heading ${node.attrs.level} hello`;
      }
      return "Tell your story here...";
    },
    includeChildren: true,
  })];

  return (

    <>
            <Navbar />
            <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
            <textarea
              
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full ml-9  md:ml-12 text-5xl font-bold mb-8 focus:outline-none bg-transparent text-[#151515] placeholder-gray-300"
            />
            <Editor
              defaultValue={data}
              disableLocalStorage={true}
              onUpdate={(editor) => {
                setData(editor?.getHTML() || '');
              }}
              extensions={extensions}
              className="bg-custom-white"
              // handleImageUpload={async (file) => {
              //   const uploads = await startUpload([file]);
              //   if (uploads && uploads.length > 0) {
              //     return uploads[0].url;
              //   }
              //   return "www.example.com/failed-upload.png";
              // }}
              
            />
            </div>
   
    </>
  );
}