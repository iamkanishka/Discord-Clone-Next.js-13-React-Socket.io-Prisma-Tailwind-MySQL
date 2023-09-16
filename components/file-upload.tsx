"use client"

import {X} from "lucide-react";
import Image from "next/image";

// Uploadthing Imports
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"


// FileUploadProps interface
interface FileUploadProps{
    onChange:(url:string)=>void
    value:string;
    endpoint:"messageFile" | "serverImage"
}
// FileUpload Conmponent
const FileUpload = ({onChange, value, endpoint}:FileUploadProps) => {
   const fileType =  value?.split(".").pop();
   if(value && fileType !=="pdf"){
    return (
        // Display  Uploaded Image 
        <div className="relative h-20 w-20">
            <Image
             fill
             src={value}
             alt="Upload"
             className="rounded-full"
            />
            
            <button onClick={()=>onChange("")}
            className="bg-rose-500 text-white p-1
            rounded-full absolute top-0 right-0 shadow-sm"
            >
                <X className="h-4 w-4"/>
            </button>

        </div>
    )
   }
   
    return ( 
    // File Upload UI 
     <UploadDropzone
       endpoint={endpoint}
       onClientUploadComplete ={(res)=>{
          onChange(res?.[0].url as string)
       }}
       onUploadError={(error:Error)=>{
        console.log(error);
        
       }}
       />
     );
}
 
export default FileUpload;