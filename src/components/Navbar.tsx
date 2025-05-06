"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { FiMenu, FiX, FiMail, FiPhone } from "react-icons/fi";
import { Button } from "./ui/button";

interface User {
  role: string;
  [key: string]: string | number | boolean | null | undefined;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
     
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            
            localStorage.removeItem("token");
            return null;
          }
          return res.json();
        })
        .then((data) => setUser(data))
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem("token"); 
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  // Navigation links based on the image and your logic
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Property type", href: "/properties" },
    { name: "Listing", href: "/properties" }, 
    { name: "About", href: "/about" },
  ];

  // Dynamic links based on user status, replacing the 'Account' link
  const authNavigation = user
    ? [
        ...(user.role === "agent"
          ? [{ name: "Agent Dashboard", href: "/agent/dashboard" }]
          : []),
        ...(user.role === "admin"
          ? [{ name: "Admin Dashboard", href: "/admin/dashboard" }]
          : []),
        { name: "Logout", href: "#", onClick: handleLogout },
      ]
    : [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
      ];

  return (
    <Disclosure as="nav" className="bg-white shadow sticky top-0 z-50">
    
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              {/* Logo Section */}
              <div className="flex items-center">
                <Link href="/">
                  {/* Replace with your logo image or styled text */}
                  <span className="text-xl font-bold text-orange-500">
                   
                    BlueYAard
                  </span>
                </Link>
              </div>

              {/* Desktop Menu and Contact Info */}
              <div className="hidden sm:flex sm:items-center">
                {/* Main Navigation Links */}
                <div className="flex space-x-6 mr-6">
                 
                  {/* Added margin to separate links from contact */}
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span className="text-gray-700 hover:text-blue-600 transition cursor-pointer">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  {/* Dynamic Auth Links (replaces Account) */}
                  {authNavigation.map((item) =>
                    item.onClick ? (
                      <Button
                        key={item.name}
                        onClick={item.onClick}
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        {item.name}
                      </Button>
                    ) : (
                      <Link key={item.name} href={item.href}>
                        <span className="text-gray-700 hover:text-blue-600 transition cursor-pointer">
                          {item.name}
                        </span>
                      </Link>
                    )
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                  
                  <div className="flex items-center space-x-1">
                    <FiMail className="h-4 w-4 text-gray-500" /> {/* Icon */}
                    <span>@realestatepro.com</span> {/* Email */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <FiPhone className="h-4 w-4 text-gray-500" /> {/* Icon */}
                    <span>(083)27700060</span> {/* Phone */}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-500 hover:text-blue-600 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FiX className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FiMenu className="h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="sm:hidden px-4 pb-3">
            <div className="space-y-2">
              {/* Main Navigation Links */}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Dynamic Auth Links */}
              {authNavigation.map((item) =>
                item.onClick ? (
                  <Disclosure.Button
                    key={item.name}
                    as="button" // Use button for onClick
                    onClick={item.onClick}
                    className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                ) : (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                  >
                    {item.name}
                  </Disclosure.Button>
                )
              )}
              {/* Decide if contact info should be in mobile menu - for this example, I'm omitting it to keep mobile menu concise.
                   You could add it here if needed, perhaps styled differently. */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
