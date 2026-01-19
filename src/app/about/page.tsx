"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, List, X } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

export default function About() {
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
                className="relative text-primary transition-colors py-1 group"
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
                className="relative hover:text-primary transition-colors py-1 group"
                href="#contact"
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
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors bg-primary/20 text-primary"
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
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors text-white hover:bg-gray-800"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            À propos d'Impact Tech
          </h1>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Impact Tech connecte des particuliers et des entreprises aux
                meilleurs prestataires dans les domaines du bâtiment &
                construction, de l&#8217;architecture, de l&#8217;électricité et
                de la technologie. Notre mission est de simplifier la
                réalisation de vos projets en combinant expertise technique,
                transparence et suivi client.
              </p>

              <h2 className="text-2xl font-semibold mt-6 mb-3">Nos valeurs</h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Excellence</li>
                <li>Professionnalisme</li>
                <li>Différence</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-3">Notre vision</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Notre vision est de fournir des services intégrés tout en
                garantissant qualité, conformité aux normes, innovation
                technique et valeur ajoutée à chaque projet.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-3">
                Notre Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Notre mission est de déployer des services performants en
                construction, architecture, technologie et électricité sur
                l&#8217;ensemble du territoire, tout en développant
                progressivement une présence à l&#8217;international, dans le
                respect des normes, des exigences de qualité et des objectifs de
                développement durable.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/services"
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Voir les services
                </Link>
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded"
                >
                  Accueil
                </Link>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow">
              <Image
                src="/images/COMPIL.png"
                alt="Impact Tech équipe"
                width={1200}
                height={800}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-background-light dark:bg-background-dark">
                <p className="text-gray-600 dark:text-gray-300">
                  Fondée pour rapprocher compétences et projets, Impact Tech
                  accompagne les initiatives locales et régionales avec une
                  approche responsable et durable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
