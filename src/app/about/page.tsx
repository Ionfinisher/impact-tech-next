"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Carousel } from "@/components/Carousel";
import { HeaderBlue } from "@/components/HeaderBlue";

export default function About() {
  return (
    <div
      className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
      id="head"
    >
      <HeaderBlue activeLink="about" />

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

            <div>
              <Carousel />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
