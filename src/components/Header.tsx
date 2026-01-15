"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react/ssr";

interface HeaderProps {
  activeLink?: "home" | "about" | "services" | "news" | "contact";
}

export function Header({ activeLink = "home" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
          <button
            className="md:hidden text-white z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={32} weight="bold" />
            ) : (
              <List size={32} weight="bold" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Drawer */}
        <div
          className={`md:hidden fixed top-0 left-0 z-40 w-72 h-screen p-4 overflow-y-auto transition-transform duration-300 bg-blue-950 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          tabIndex={-1}
          aria-labelledby="drawer-label"
        >
          <div className="border-b border-gray-700 pb-4 flex items-center justify-between">
            <Link
              className="flex items-center"
              href="/"
              onClick={closeMobileMenu}
            >
              <Image
                alt="Impact Tech logo"
                className="h-8 w-auto"
                src="/images/LOGO-IMPACT-TECH.png"
                width={120}
                height={40}
              />
            </Link>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-400 bg-transparent hover:text-white hover:bg-gray-800 rounded-lg w-9 h-9 flex items-center justify-center"
              aria-label="Close menu"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          <div className="py-5">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-2 py-2.5 rounded-lg transition-colors ${
                    activeLink === "home"
                      ? "bg-primary/20 text-primary"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-2 py-2.5 rounded-lg transition-colors ${
                    activeLink === "about"
                      ? "bg-primary/20 text-primary"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  <span>A Propos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-2 py-2.5 rounded-lg transition-colors ${
                    activeLink === "services"
                      ? "bg-primary/20 text-primary"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#news"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-2 py-2.5 rounded-lg transition-colors ${
                    activeLink === "news"
                      ? "bg-primary/20 text-primary"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  <span>Actualités</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={closeMobileMenu}
                  className={`flex items-center px-2 py-2.5 rounded-lg transition-colors ${
                    activeLink === "contact"
                      ? "bg-primary/20 text-primary"
                      : "text-white hover:bg-gray-800"
                  }`}
                >
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}
