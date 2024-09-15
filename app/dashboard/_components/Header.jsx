"use client";
import { useKindeBrowserClient, kindeLogout } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { user } = useKindeBrowserClient(); // `logout` removed for now
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the dropdown menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Function to handle logout and redirect to login page
  // const handleLogout = () => {
     
  // };

  return (
    <div className="p-4 shadow-sm border flex justify-between relative">
      <div>
        <h1 className="flex justify-center text-2xl font-semibold text-white border rounded-lg p-2">
          Student Attendance Tracking System
        </h1>
      </div>
      <div className="relative" ref={menuRef}>
        {/* User picture that opens the menu */}
        <Image
          src={user?.picture}
          width={50}
          height={50}
          alt="user"
          className="rounded-full cursor-pointer"
          onClick={toggleMenu}
        />

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg text-black">
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/profile">Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                {/* Use LogoutLink to log out and redirect */}
                <LogoutLink
                  redirectUri="/" // Where to redirect after logout
                  className="text-black"
                >
                  Log Out
                </LogoutLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
