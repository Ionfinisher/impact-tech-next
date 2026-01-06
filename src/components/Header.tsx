"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  activeLink?: "home" | "about" | "services" | "news" | "contact";
}

export function Header({ activeLink = "home" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClasses = (link: string) => {
    const isActive = activeLink === link;
    return `relative ${
      isActive ? "text-primary" : "hover:text-primary"
    } transition-colors py-1 group`;
  };

  const getUnderlineClasses = (link: string) => {
    const isActive = activeLink === link;
    return `absolute bottom-0 left-0 w-full h-0.5 bg-primary ${
      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    } origin-center transition-transform ${!isActive && "duration-300"}`;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-6 transition-all duration-300 ${
        isScrolled ? "bg-blue-950 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <Link className="text-2xl font-black text-white" href="/">
            <Image
              alt="Impact Tech logo"
              className="h-10 w-auto"
              src="/images/LOGO-IMPACT-TECH.png"
              width={150}
              height={50}
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-white font-medium">
            <Link className={getLinkClasses("home")} href="/">
              <span>Accueil</span>
              <span className={getUnderlineClasses("home")}></span>
            </Link>
            <Link className={getLinkClasses("about")} href="/about">
              <span>A Propos</span>
              <span className={getUnderlineClasses("about")}></span>
            </Link>
            <Link className={getLinkClasses("services")} href="/services">
              <span>Services</span>
              <span className={getUnderlineClasses("services")}></span>
            </Link>
            <Link className={getLinkClasses("news")} href="#news">
              <span>Actualités</span>
              <span className={getUnderlineClasses("news")}></span>
            </Link>
            <Link className={getLinkClasses("contact")} href="#contact">
              <span>Contact</span>
              <span className={getUnderlineClasses("contact")}></span>
            </Link>
          </div>
          <button className="md:hidden text-white">
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
