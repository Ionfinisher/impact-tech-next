"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { HeaderBlue } from "@/components/HeaderBlue";

export default function TermsOfService() {
  return (
    <div
      className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
      id="head"
    >
      <HeaderBlue activeLink="about" />

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
