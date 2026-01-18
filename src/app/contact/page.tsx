"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, List, X } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  return (
    <div
      className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
      id="head"
    >
      <header className="absolute top-0 left-0 right-0 z-50 py-6 bg-blue-950 backdrop-blur-md">
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
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
                href="/#"
              >
                <span>Accueil</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
              </Link>
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
                href="/about"
              >
                <span>A Propos</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-100 origin-center transition-transform"></span>
              </Link>
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
                href="/services"
              >
                <span>Services</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
              </Link>
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
                href="#news"
              >
                <span>Actualités</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
              </Link>
              <Link
                className="relative text-primary transition-colors py-1 group"
                href="/contact"
              >
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
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
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors text-white hover:bg-gray-800"
                  >
                    <span>Accueil</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors text-white hover:bg-gray-800"
                  >
                    <span>A Propos</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    onClick={closeMobileMenu}
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors text-white hover:bg-gray-800"
                  >
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#news"
                    onClick={closeMobileMenu}
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors text-white hover:bg-gray-800"
                  >
                    <span>Actualités</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors bg-primary/20 text-primary"
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

      <main className="pt-32 pb-20">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
