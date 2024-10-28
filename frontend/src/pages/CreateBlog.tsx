import { Editor } from "novel-lightweight";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Placeholder } from "novel/extensions";
import { firebaseConfig } from "../config.ts";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageExtension from '../components/ImageExtension.tsx';
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/user.tsx";
import Auth from "../components/Auth.tsx";


export default function CreateBlog() {
  const [data, setData] = useState("Tell your story here...");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const user = useRecoilValue(userAtom);


  const storage = getStorage(initializeApp(firebaseConfig));

  const savePastedImage = async (file: File) => {
    try {
      // Generate a unique filename to prevent overwrites
      console.log('image si uplaoading');
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
    
    }

  const extensions = [
    ImageExtension(savePastedImage),
    Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "text") {
        return `Heading ${node.attrs.level}`;
      }
      return "Tell your story here...";
    },
    includeChildren: true,
  })];


  async function handlePreview() {
    navigate('/blog/preview/' , {
      state: {
        title,
        content: data,
      },
    });
  }
  
  return (

    <>
            <Navbar publish={true} handlePublish={handlePreview} />
            {user === undefined && <>
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <Auth type="login" />
              </div>
            </>}
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