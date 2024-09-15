"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideNav() {
  const { user } = useKindeBrowserClient(); // this is used to get the image from your registered id.
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  const path = usePathname();
  useEffect((path)=>{
    console.log(path);
  }, []);
  return (
    <div className="border shadow-md h-screen mx-auto p-5">
      <div className="flex justify-center">
      <Image src="/main-image.png" width={100} height={30} alt="logo"  className="bg-transparent"/>

      </div>
      <hr className="my-5"></hr>
      {menuList.map((menu, index) => (
        <Link href={menu.path}>
          <h2 className={`flex text-md text-slate-500  items-center justify-center gap-3 p-4 hover:bg-blue-700 border-2 rounded-md my-2 hover:text-white cursor-pointer ${path == menu.path && 'bg-blue-700 text-white'}`}>
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}
      <div className="flex gap-2 items-center mt-4 bottom-5 fixed">
        <Image
          src={user?.picture}
          width={35}
          height={35}
          alt="user"
          className="rounded-full"
        />
        <div >
          <p className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </p>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>
      </div>
    </div>  
  );
}

export default SideNav;
