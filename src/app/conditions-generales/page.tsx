"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, List, X } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

export default function TermsOfService() {
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
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
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
                href="#"
              >
                <span>Actualités</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
              </Link>
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
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
                    href="#"
                    onClick={closeMobileMenu}
                    className="flex items-center px-2 py-2.5 rounded-lg transition-colors text-white hover:bg-gray-800"
                  >
                    <span>Actualités</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
            Conditions Générales d'Utilisation
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptation des Conditions
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En téléchargeant et en utilisant l'application Impact Tech, vous
                acceptez de respecter les présentes Conditions d'Utilisation. Si
                vous n'acceptez pas ces conditions, veuillez ne pas utiliser
                l'application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                2. Utilisation de l'application
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Impact Tech est destinée à connecter les utilisateurs avec des
                prestataires de services dans les domaines du bâtiment, de
                l'architecture, de l'électricité et de la technologie.
                L'application est réservée à un usage personnel et
                professionnel. Toute utilisation frauduleuse ou contraire à la
                loi est strictement interdite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                3. Confidentialité et Sécurité des Données
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Vos données personnelles sont collectées et traitées
                conformément à notre Politique de Confidentialité. Les
                informations sont stockées de manière sécurisée et ne sont
                partagées avec des tiers que dans le cadre de la fourniture des
                services demandés. Impact Tech ne vend ni ne loue vos données
                personnelles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                4. Limitations de Responsabilité
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Impact Tech agit en tant qu'intermédiaire entre les utilisateurs
                et les prestataires de services. Nous ne sommes pas responsables
                de la qualité, des délais ou des coûts des services fournis par
                les prestataires. L'utilisateur est seul responsable de ses
                choix et des accords conclus avec les prestataires via
                l'application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                5. Propriété Intellectuelle
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Tous les contenus et éléments de l'application Impact Tech, y
                compris les logos, interfaces, codes et contenus, sont protégés
                par les lois sur la propriété intellectuelle. Toute
                reproduction, distribution ou utilisation non autorisée est
                interdite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                6. Mises à jour et modifications
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Impact Tech se réserve le droit de modifier ou de mettre à jour
                l'application ainsi que les présentes Conditions d'Utilisation à
                tout moment. Les utilisateurs seront informés des modifications
                significatives par notification dans l'application ou par email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Résiliation</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Impact Tech peut suspendre ou mettre fin à votre accès à
                l'application en cas de violation des présentes Conditions
                d'Utilisation, d'activités frauduleuses ou de comportement
                inapproprié. L'utilisateur peut également supprimer son compte à
                tout moment depuis les paramètres de l'application.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Pour toute question, réclamation ou assistance concernant
                l'application Impact Tech, veuillez nous contacter à l'adresse
                suivante :
              </p>
              <p className="text-primary font-semibold mt-2">
                <Link
                  href="mailto:impacttech@gmail.com"
                  className="hover:underline"
                >
                  contact@impacttechafrica.com
                </Link>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                Ou par téléphone :{" "}
                <span className="font-semibold">+228 70 57 78 03</span>
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dernière mise à jour : 06 Janvier 2026
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-[#a08945] transition-colors"
              >
                Retour à l'accueil
              </Link>
              <Link
                href="/services"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                Voir nos services
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
