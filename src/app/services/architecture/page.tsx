"use client";

import Link from "next/link";
import Image from "next/image";
import { PencilRuler, List, X } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { HeaderBlue } from "@/components/HeaderBlue";

export default function ServicesIndex() {
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
    <>
      <div
        className="bg-background-light dark:bg-background-dark min-h-screen"
        id="head"
      >
        <HeaderBlue activeLink="services" />

        <main className="pt-32 pb-20 container mx-auto px-4">
          <div className="flex items-center gap-6 my-8">
            <PencilRuler size={40} weight="duotone" className="text-primary" />
            <h1 className="text-3xl font-bold">Service Architecture</h1>
          </div>

          <p className="text-gray-700 dark:text-white mb-6 max-w-3xl">
            Nos architectes enregistrés conçoivent des plans adaptés, respectant
            normes et budgets. Nous réalisons esquisses, permis, plans
            d'exécution et suivi technique jusqu'à la livraison.
          </p>

          <ul className="list-disc pl-5 mb-8 text-gray-700 dark:text-white max-w-2xl">
            <li>Accompagnement de projet de l'idéation à la finition</li>
            <li>Conception & rendu 3D</li>
            <li>Dossiers administratifs</li>
            <li>Plans techniques & détail</li>
            <li>Assistance chantier</li>
          </ul>

          <div className="mb-8">
            <Image
              src="/images/G.C.png"
              alt="Architecture"
              width={1200}
              height={600}
              className="rounded-lg shadow"
            />
          </div>

          <div className="flex gap-4">
            <Link
              href="/services"
              className="px-4 py-2 bg-gray-200 dark:bg-gray-900 dakr:text-white rounded"
            >
              Retour aux services
            </Link>
            <Link href="/" className="px-4 py-2 bg-primary text-white rounded">
              Accueil
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
