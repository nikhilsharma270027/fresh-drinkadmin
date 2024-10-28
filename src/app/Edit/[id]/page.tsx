'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { CopyPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation'


interface Params {
  id: string; // Change this type if the ID is not a string
}

const Edit = () => {
  const router = useRouter();

  const params = useParams() as unknown as Params;
  const { id } = params; // Extract the ID from params
  // console.log(id); 

  const [name, setName] = useState('');
  const [imageurl, setImageUrl] = useState('');
  const [price, setPrice] = useState<number>(0);

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get(`/api/Edit?id=${id}`);
      const data = response.data;
      setName(data?.name);
      setImageUrl(data?.imageurl);
      setPrice(data?.price);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [id]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  async function postProducts() {
    try {
      const data = { name, price, imageurl, _id: id };
      await axios.post('/api/Edit', data)
      .then((response) => {
        console.log(response.data)
      })
      toast.success("Product updated successfully!");
      router.push("/")
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  function changes(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; // Optional chaining in case no file is selected
    if (!file) return;
  
    const storage = getStorage();
    const storageRef = ref(storage, `img/${file.name}`);
  
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setImageUrl(downloadURL);
      });
    });
  }

  return (
    <div className="m-12">
      <div>
        <div className="text-5xl font-extrabold">
          Edit product Fresh Drink
        </div>
        <div>
          <div className=' mt-5 font-extrabold text-3xl'>Product Name</div>
          <Input value={name}  onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setName(event?.target.value)} style={{width: 300}}/>
        </div>
        <div className='mt-5'>
          <div className='font-extrabold text-3xl'>Description</div>
          <Input placeholder='Fresh-drink description' type='text' style={{width: 300}}/>
        </div>
        <div className='mt-5'>
  <div className='font-extrabold text-3xl'>Product Photo</div>
  <div className='flex items-center'>
    {imageurl && (
      <Input type='image' src={imageurl} style={{ width: 300, height: 300, backgroundColor: 'black' }} />
    )}
    <label className="relative cursor-pointer w-[300px] h-[300px] border-zinc-400 border-2 px-5 ml-5">
      <Input 
        type='file' 
        onChange={changes}
        className="hidden left-10 "
      />
      <CopyPlus className='bg-white rounded-lg w-40 h-40 absolute top-12 left-16'/>
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        
      </div>
    </label>
  </div>
</div>

        <div className='mt-5'>
          <div className='font-extrabold text-3xl'>Price</div>
          <Input value={price} onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setPrice(Number(event.target.value))} type='number' style={{width: 300}}/>
        </div>
        <div className='mt-5'>
          <Button onClick={postProducts} type='submit'>Submit Changes</Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Edit;
