"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { app } from "@/lib/firebase";
// import { app } from "@/lib/firebase";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { CopyPlus} from "lucide-react";
import Image from "next/image";
import React, {  ChangeEvent, useState } from "react";


const AddProduct: React.FC = () => {
  const [name, setname] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [price, setPrice] = useState(0);
  const [open, setopen] = useState(false);

  function changes(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // Optional chaining in case no file is selected
    if (!file) return;
  
    const storage = getStorage(app);
    const storageRef = ref(storage, `img/${file.name}`);
  
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setimageurl(downloadURL);
      });
    });
  }

  async function sendData(){
    try {
      const data = { name, imageurl, price };
      const response = await axios.post("/api/addproduct", data);
      console.log(response.data);
      setname("");
      setimageurl("");
      setPrice(0);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
  

  return (
    <div className="mr-10 m-6 ">
      <div className="relative md:blcok  w-full h-full ml-14 rounded-3xl over">
        {open == true ? <Navbar setopen={setopen} open={open} /> : " "}
      </div>
      <div className="flex gap-x-6 ">
        <div className="">
        <Image
            className="h-16 w-16 ml-5"
            src="/images/ham.png"
            alt="Hamburger"
            width={500}  // Set appropriate width
        height={300}  // Set appropriate height
            onClick={() => setopen(!open)}
          />
        </div>
        <div className="font-extrabold text-zinc-600 text-3xl pt-6 text-nowrap">
          Welcome User!
        </div>
      </div>

      <div className="ml-5 bg-zinc-300 rounded-3xl w-screen max-h-screen overflow-hidden">
        <div className="ml-10 py-10">
          <div className="text-left text-3xl text-black font-extrabold py-2">
            Add New Product
          </div>
<hr ></hr>
          <div className="mt-5">
            <label className="font-extrabold ">Product name:</label>
            <Input type="text" required style={{width: 400}} className="mt-4 mb-4 bg-white text-black focus:border-white" onChange={(e) => setname(e.target.value)}/>
            <label className="mt-5 font-extrabold">Description:</label>
            <Input type="text" style={{width: 400}} className="mt-4 mb-4 bg-white text-black focus:border-white"/>
            <label className="mt-4 font-extrabold">Photos:</label>
            <div className="flex items-center">
              {imageurl && (
                <Input
                  type="image"
                  src={imageurl}
                  width={10}  
                  height={10} 
                  className="w-72 h-72" 
                  style={{ backgroundColor: "black" }}
                />
              )}
              <label className="relative cursor-pointer w-[300px] h-[300px] border-zinc-400 border-2 px-5 ml-5 bg-white mt-5 mb-5">
                <Input
                  type="file"
                  onChange={changes}
                  className="hidden left-10 "
                />
                <CopyPlus className="bg-white rounded-lg w-40 h-40 absolute top-12 left-16" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold"></div>
              </label>
            </div>
            <label className="mt-4 font-extrabold">Price:</label>
            <Input type="number" onChange={(e) => setPrice(e.target.valueAsNumber)} required style={{width: 400}} className="mt-4 mb-4 bg-white text-black font-extrabold focus:border-white"/>
          </div>
          <Button type="submit" onClick={sendData}>Add Product</Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
