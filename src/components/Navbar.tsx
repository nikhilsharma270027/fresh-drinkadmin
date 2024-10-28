"use Client";
import { ListOrdered, MonitorCheck, PackagePlus, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface NavbarProps {
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const navItems = [
    { key: 1,icon: <MonitorCheck size={36} strokeWidth={2.75}/>, name: "Dashboard", path: "/" },
    { key: 2,icon: <PackagePlus size={36} strokeWidth={2.75} />, name: "Add product", path: "/Addproduct" },
    { key: 3,icon: <ListOrdered size={36} strokeWidth={2.75} />, name: "Orders", path: "" },
  ];

const Navbar: React.FC<NavbarProps> = ({ open, setopen}) => {
  return (
    <div className={`md:block absolute border-2 border-black  bg-zinc  border-grey h-[900px] overflow-hidden  w-72 rounded-3xl rounded-l  mb-6 -left-28 bg-zinc-400 z-10 shadow-myShadowc ${open ? 'navbarSlide' : " "}`}>
      <div className='bg-zinc-400 w-72 overflow-x-hidden'>
        {/* navbar name */}
        <div className='flex items-center justify-around pt-4 pl-4 pb-6'>
          <div className='flex justify-center items-center'>
            <Image src='/can.png' alt='' className='h-8' width={50}  // Set appropriate width
        height={50}  />
            <div className='font-extrabold text-nowrap text-2xl'>Fresh-Drink</div>
          </div>
          
            <X size={36} strokeWidth={2.75} className='block cursor-pointer gap-8 font-extralight' onClick={() => setopen(!open)}/>
        </div>
      
        {/* 1st item */}
        <div className=''>

        {
          navItems.map((item) => (
            <div key={item.key} className='flex items-center justify-center pb-5 '>
              <Link href={item.path}>
              <div className='flex w-full bg-white px-12 py-4 rounded-2xl cursor-pointer'>


                    <div>{item.icon}</div>
                    <div className='pl-3 font-extrabold text-2xl text-nowrap'>{item.name}</div>
                </div>
              </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
