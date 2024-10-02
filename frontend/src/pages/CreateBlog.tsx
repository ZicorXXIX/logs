import { Editor } from "novel-lightweight";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Placeholder } from "novel/extensions";
import axios from "axios";
import { BACKEND_URL, firebaseConfig } from "../config";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default function CreateBlog() {
  const [data, setData] = useState("Tell your story here...");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const storage = getStorage(initializeApp(firebaseConfig));

  const extensions = [Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "text") {
        return `Heading ${node.attrs.level}`;
      }
      return "Tell your story here...";
    },
    includeChildren: true,
  })];

  async function handlePublish() {
  //   const response =await axios.post(`${BACKEND_URL}/api/v1/blog`, {
  //     title,
  //     content: data
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("jwt")}`
  //     }
  //   }
  // );
    // console.log(response);
    navigate('/blog/preview/' , {
      state: {
        title,
        content: data,
      },
    });
  }
  return (

    <>
            <Navbar publish={true} handlePublish={handlePublish} />
            <div className=" px-[5%] md:px-[20%] mt-10 bg-custom-white">
            <textarea              
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full ml-9  md:ml-12 text-5xl font-bold mb-4 focus:outline-none bg-transparent text-[#151515] placeholder-gray-300"
            />
            <Editor
              defaultValue={data}
              disableLocalStorage={true}
              onUpdate={(editor) => {
                setData(editor?.getHTML() || '');
              }}
              extensions={extensions}
              className="bg-custom-white"
              handleImageUpload={async (file) => {
                try {
                  // Generate a unique filename to prevent overwrites
                  console.log(file);
                  const filename = `${Date.now()}-${file.name}`;
                  const imageRef = ref(storage, `images/${filename}`);
            
                  await uploadBytes(imageRef, file);     
        
                  const imageUrl = await getDownloadURL(imageRef);
            
                  return imageUrl; 
                } catch (error) {
                  console.error("Error uploading image:", error);
                  return ""; 
                }
              }}
              
            />
            </div>

            <div>
                      

            </div>


   
    </>
  );
}