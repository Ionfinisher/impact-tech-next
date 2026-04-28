"use client";

import Link from "next/link";
import Image from "next/image";
import { LightningIcon } from "@phosphor-icons/react/ssr";
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
          <div className="flex items-center gap-4 my-8">
            <LightningIcon
              size={40}
              weight="duotone"
              className="text-primary"
            />
            <h1 className="text-3xl font-bold">Service Électricité</h1>
          </div>

          <p className="text-gray-700 dark:text-white max-w-3xl mb-6">
            Notre service d'électricité propose des solutions complètes :
            installation, maintenance, plans électriques et interventions toutes
            tensions (basse, moyenne et haute). Nous accompagnons la conception,
            l'exécution et la réception des installations électriques.
          </p>

          <ul className="list-disc pl-5 mb-8 text-gray-700 dark:text-white max-w-2xl">
            <li>Études et chiffrage électrique</li>
            <li>Installation et mise en service</li>
            <li>Maintenance préventive et corrective</li>
            <li>Protection, tableaux et schémas électriques</li>
          </ul>

          <div className="mb-8">
            <Image
              src="/images/G.E.png"
              alt="Électricité"
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
