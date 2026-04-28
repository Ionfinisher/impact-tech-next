"use client";

import Link from "next/link";
import Image from "next/image";
import { HardHatIcon } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { HeaderBlue } from "@/components/HeaderBlue";

export default function ServicesIndex() {
  return (
    <>
      <div
        className="bg-background-light dark:bg-background-dark min-h-screen"
        id="head"
      >
        <HeaderBlue activeLink="services" />

        <main className="pt-32 pb-20 container mx-auto px-4">
          <div className="flex items-center gap-6 my-8">
            <HardHatIcon size={40} weight="duotone" className="text-primary" />
            <h1 className="text-3xl font-bold">
              Service Bâtiment & Construction
            </h1>
          </div>

          <p className="text-gray-700 dark:text-white mb-6 max-w-3xl">
            Pour vos projets de construction nous fournissons ouvriers
            qualifiés, matériaux, engins, gestion de chantier et coordination.
            Nous accompagnons les petits et grands projets, de l'estimation au
            suivi d'exécution.
          </p>

          <ul className="list-disc pl-5 mb-8 text-gray-700 dark:text-white max-w-2xl">
            <li>Études de faisabilité & chiffrage</li>
            <li>Approvisionnement en matériaux</li>
            <li>Equipe chantier & supervision</li>
            <li>Gestion qualité et livraison</li>
          </ul>

          <div className="mb-8">
            <Image
              src="/images/G.C_1.png"
              alt="Construction"
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
