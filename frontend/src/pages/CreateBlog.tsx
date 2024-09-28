import { Editor, EditorRoot, EditorContent } from "novel";
import { useState } from "react";


export default function CreateBlog() {
    const [content, setContent] = useState("null");
    return (
    <EditorRoot>
      <EditorContent
        // initialContent={content}
        onUpdate={({ editor }: any) => {
          const json = editor.getJSON();
          setContent(json);
        }}
      />
    </EditorRoot>
  );
}