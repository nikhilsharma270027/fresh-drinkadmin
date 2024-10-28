"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
interface Product {
  _id: string;
  name: string;
  imageurl: string;
  price: number;
}

const DashBoard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [open, setopen] = useState(false);
  // const notify =

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("/api/products");
      setProducts(response.data || []);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error fetching products:", axiosError.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [data]);

  async function updateData() {
    try {
      const response = await axios.put<Product[]>("/api/products");
      setData(response.data || []);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Error updating products:", axiosError.message);
    }
  }

  async function deleteproduct(Id: string, index: number) {
    if (index < 5) {
      toast.error("You cannot delete the initial products!"); // Toast error message
      return;
    }
    if (confirm("Are you sure u want to delete this product")) {
      const getresponse = await axios.delete(`/api/addproduct?_id=${Id}`);
      console.log(getresponse);
      updateData();
    }
  }

  return (
    <div className="mr-10 m-6">
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
        <div className="font-extrabold text-zinc-600 text-3xl pt-6">
          Welcome User!
        </div>
      </div>

      <div className="ml-4 bg-zinc-300 rounded-3xl w-[1820px] max-h-[850px] overflow-x-clip overflow-y-scroll scroll-smooth">
        <div className="ml-10 py-10">
          <Link href="/Addproduct">
            <div className=" text-center text-3xl text-black font-extrabold bg-white rounded-3xl py-3 px-3 min-w-screen mr-5 border-2 border-black hover:bg-slate-400 hover:delay-75">
              Add Products
            </div>
          </Link>
          <div className="text-center text-3xl text-white font-extrabold py-5 ">
            Products
          </div>
          {products.map((product, index) => (
            <div key={product._id} className="flex justify-evenly items-center">
              <Image
                src={product.imageurl}
                alt={product.name}
                width={200}  // Set appropriate width
                height={200}  
                className="pb-5 "
              />

              <div className="flex flex-col justify-start px-5">
                <h2 className="text-xl font-extrabold text-black text-pretty">
                  {product.name}
                </h2>
                <p className="text-xl font-extrabold text-black">
                  Price: ${product.price}
                </p>
              </div>

              {/* <div className="flex justify-between"> */}
              <Button
                className="ml-5 w-20 h-20 px-20 py-0 font-extrabold text-black rounded-2xl bg-zinc-500 hover:bg-zinc-100 shadow-myShadow"
                onClick={() => deleteproduct(product._id, index)}
              >
                <Trash2 style={{ width: 40, height: 40 }} />
                Delete
              </Button>
              <Link href={`/Edit/${product._id}`}>
                <Button className="w-20 h-20 px-20 py-0 font-extrabold text-black rounded-2xl bg-zinc-500 hover:bg-zinc-100 shadow-myShadow">
                  <SquarePen style={{ width: 40, height: 40 }} />
                  Edit
                </Button>
              </Link>

              {/* </div> */}
            </div>
          ))}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DashBoard;
