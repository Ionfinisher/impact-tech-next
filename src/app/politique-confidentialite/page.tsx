"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, List, X } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";

export default function PolitiqueConfidentialite() {
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Politique de Confidentialité
          </h1>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Dernière mise à jour : 06 Janvier 2026
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Bienvenue sur Impact Tech, une application conçue pour connecter
              les utilisateurs avec des prestataires de services professionnels
              dans les domaines du bâtiment, de l'architecture, de l'électricité
              et de la technologie. Chez Impact Tech, nous nous engageons à
              protéger votre vie privée et à assurer la sécurité de vos
              informations personnelles. Cette Politique de Confidentialité
              décrit comment nous collectons, utilisons, divulguons et
              protégeons vos données lorsque vous utilisez notre application.
            </p>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Informations que nous collectons
              </h2>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                1.1 Informations personnelles
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Lorsque vous créez un compte Impact Tech ou utilisez nos
                services, nous pouvons collecter les informations personnelles
                suivantes :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Nom et prénom</li>
                <li>Numéro de téléphone</li>
                <li>Adresse e-mail</li>
                <li>Adresse physique</li>
                <li>
                  Informations de projet (type de service demandé, budget, etc.)
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                1.2 Données de localisation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Avec votre consentement, nous pouvons collecter des informations
                sur votre localisation pour vous connecter avec des prestataires
                à proximité et améliorer la pertinence des services proposés.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-6">
                1.3 Données d'utilisation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Nous collectons des informations sur votre interaction avec
                l'application, notamment :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Les fonctionnalités que vous utilisez</li>
                <li>Le temps passé sur l'application</li>
                <li>Les recherches effectuées</li>
                <li>
                  Les informations sur l'appareil (type d'appareil, système
                  d'exploitation)
                </li>
                <li>Les interactions avec les prestataires</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. Comment nous utilisons vos informations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Nous utilisons les informations collectées aux fins suivantes :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  Pour fournir et maintenir notre service de mise en relation
                </li>
                <li>
                  Pour faciliter la communication entre utilisateurs et
                  prestataires
                </li>
                <li>
                  Pour traiter vos demandes de service et gérer les projets
                </li>
                <li>
                  Pour améliorer et personnaliser votre expérience avec
                  l'application
                </li>
                <li>
                  Pour communiquer avec vous concernant les mises à jour, devis
                  et nouvelles fonctionnalités
                </li>
                <li>
                  Pour répondre à vos demandes et fournir un support client
                </li>
                <li>
                  Pour détecter, prévenir et traiter les problèmes techniques ou
                  les activités frauduleuses
                </li>
                <li>
                  Pour effectuer des analyses statistiques et améliorer nos
                  services
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                3. Stockage et sécurité des données
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Nous mettons en œuvre des mesures de sécurité rigoureuses pour
                protéger vos données :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  Toutes les transmissions de données entre l'application et nos
                  serveurs sont cryptées à l'aide des protocoles SSL/TLS
                </li>
                <li>
                  Nous utilisons des fournisseurs de stockage cloud sécurisés
                  qui respectent les normes internationales de protection des
                  données
                </li>
                <li>
                  L'accès aux données personnelles est strictement limité aux
                  employés autorisés
                </li>
                <li>
                  Des audits de sécurité et des évaluations de vulnérabilité
                  réguliers sont effectués pour garantir l'intégrité de nos
                  systèmes
                </li>
                <li>
                  Les mots de passe sont stockés de manière cryptée et ne sont
                  jamais accessibles en clair
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                4. Partage et divulgation des données
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Nous ne vendons, n'échangeons ni ne louons vos informations
                personnelles à des tiers. Nous pouvons partager vos informations
                dans les circonstances suivantes :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  Avec les prestataires de services que vous avez choisis, pour
                  faciliter la réalisation de votre projet
                </li>
                <li>
                  Avec des fournisseurs de services tiers qui nous aident à
                  exploiter notre application (hébergement, analyse, support
                  client)
                </li>
                <li>
                  Si requis par la loi ou en réponse à des procédures
                  judiciaires valides
                </li>
                <li>
                  Pour protéger nos droits, notre vie privée, notre sécurité ou
                  notre propriété, ainsi que ceux de nos utilisateurs
                </li>
                <li>
                  Dans le cadre d'une fusion, acquisition ou vente d'actifs
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Vos droits et choix
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Conformément aux réglementations sur la protection des données,
                vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  Accéder à vos informations personnelles et en obtenir une
                  copie
                </li>
                <li>Corriger ou mettre à jour vos informations personnelles</li>
                <li>Demander la suppression de vos données personnelles</li>
                <li>Vous opposer au traitement de vos données personnelles</li>
                <li>
                  Retirer votre consentement pour l'utilisation de la
                  localisation à tout moment
                </li>
                <li>Vous désinscrire des communications marketing</li>
                <li>Demander la portabilité de vos données</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Pour exercer ces droits, veuillez nous contacter en utilisant
                les informations fournies dans la section "Nous contacter".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                6. Conservation des données
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Nous conservons vos informations personnelles aussi longtemps
                que nécessaire pour fournir nos services et respecter nos
                obligations légales. Lorsque vous supprimez votre compte, nous
                supprimons ou anonymisons vos données personnelles dans un délai
                raisonnable, sauf si nous sommes tenus de les conserver pour des
                raisons légales ou réglementaires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                7. Cookies et technologies similaires
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Impact Tech utilise des cookies et des technologies similaires
                pour améliorer votre expérience, analyser l'utilisation de
                l'application et personnaliser le contenu. Vous pouvez gérer vos
                préférences en matière de cookies via les paramètres de votre
                navigateur ou de l'application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                8. Modifications de cette politique de confidentialité
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Nous pouvons mettre à jour cette Politique de Confidentialité de
                temps à autre pour refléter les changements dans nos pratiques
                ou pour d'autres raisons opérationnelles, légales ou
                réglementaires. Nous vous informerons de tout changement
                significatif en publiant la nouvelle Politique de
                Confidentialité sur cette page et en mettant à jour la date de
                "Dernière mise à jour". Nous vous encourageons à consulter
                régulièrement cette page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Nous contacter</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Si vous avez des questions, des préoccupations ou des demandes
                concernant cette Politique de Confidentialité ou le traitement
                de vos données personnelles, veuillez nous contacter à :
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">
                  Impact Tech
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Email :{" "}
                  <Link
                    href="mailto:contact@impacttechafrica.com"
                    className="text-primary hover:underline"
                  >
                    contact@impacttechafrica.com
                  </Link>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Téléphone :{" "}
                  <span className="font-semibold">+228 70 57 78 03</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Adresse : Lomé, Togo
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-primary/10 rounded-lg border-l-4 border-primary">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                En utilisant Impact Tech, vous acceptez les conditions décrites
                dans cette Politique de Confidentialité. Si vous n'êtes pas
                d'accord avec cette politique, veuillez ne pas utiliser notre
                application.
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
                href="/conditions-generales"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-900 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                Conditions Générales
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
