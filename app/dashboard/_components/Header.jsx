"use client";
import { useKindeBrowserClient, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

function Header() {
  const { user } = useKindeBrowserClient(); // Get user info from Kinde
  const [menuOpen, setMenuOpen] = useState(false); // Dropdown state
  const [isMobile, setIsMobile] = useState(false); // Mobile screen state
  const menuRef = useRef(null); // Reference for the dropdown menu

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Detect screen size to toggle between user image and burger button
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check on component mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="p-4 shadow-sm border flex justify-between items-center relative gap-3">
      {/* Header Title */}
      <div>
        <h1 className="flex justify-center text-2xl font-semibold text-white border rounded-lg p-2">
          Student Attendance Tracking System
        </h1>
      </div>

      {/* User Profile or Burger Button */}
      <div className="flex justify-center items-center" ref={menuRef}>
        {isMobile ? (
          // Burger Button for Mobile
          <button
            className="p-2 bg-white border rounded-md shadow-md"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
          </button>
        ) : (
          // User Profile Image for Larger Screens
          <Image
            src={user?.picture}
            width={50}
            height={50}
            alt="user"
            className="cursor-pointer sm:w-20 sm:h-20 object-cover border-2 rounded-full"
            onClick={toggleMenu}
          />
        )}

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-56 w-36 mr-3 bg-white border rounded-lg shadow-lg text-black">
            <ul className="py-2">
              {/* Dashboard */}
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              {/* Students */}
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/dashboard/students">Students</Link>
              </li>
              {/* Attendance */}
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link href="/dashboard/attendance">Attendance</Link>
              </li>

              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <LogoutLink
                  redirectUri="/"
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
