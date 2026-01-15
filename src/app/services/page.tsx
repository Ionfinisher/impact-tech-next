import Link from "next/link";
import Image from "next/image";
import {
  HardHat,
  PencilRuler,
  Lightning,
  Laptop,
} from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function ServicesIndex() {
  return (
    <>
      <div
        className="bg-background-light dark:bg-background-dark min-h-screen"
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
                  className="relative text-primary transition-colors py-1 group"
                  href="/services"
                >
                  <span>Services</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-100 origin-center transition-transform"></span>
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
              <button className="md:hidden text-white">
                <span className="material-symbols-outlined text-3xl">menu</span>
              </button>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-4 py-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-950 dark:text-white">
            Nos services
          </h1>
          <p className="mb-12 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Découvrez nos quatre pôles d'expertise qui couvrent l'ensemble de
            vos besoins en construction, architecture, électricité et
            technologie. Chaque service est conçu pour vous accompagner de la
            conception à la réalisation de vos projets.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Link href="/services/bc" className="block group">
              <li className="p-8 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-transparent hover:border-primary">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <HardHat
                      size={32}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                    Bâtiment & Construction
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Solutions complètes pour tous vos projets de construction.
                  Nous fournissons main-d'œuvre qualifiée, matériaux de qualité,
                  équipements et gestion de chantier.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>• Études de faisabilité & chiffrage</li>
                  <li>• Approvisionnement en matériaux</li>
                  <li>• Équipe de chantier & supervision</li>
                  <li>• Gestion qualité et livraison</li>
                </ul>
              </li>
            </Link>

            <Link href="/services/architecture" className="block group">
              <li className="p-8 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-transparent hover:border-primary">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <PencilRuler
                      size={32}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                    Architecture
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Conception architecturale sur mesure avec nos architectes
                  agréés. De l'esquisse à la réalisation, nous créons des
                  espaces adaptés à vos besoins et budgets.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>• Conception & rendu 3D</li>
                  <li>• Dossiers administratifs & permis</li>
                  <li>• Plans techniques & détails</li>
                  <li>• Assistance et suivi de chantier</li>
                </ul>
              </li>
            </Link>

            <Link href="/services/technology" className="block group">
              <li className="p-8 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-transparent hover:border-primary">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Laptop
                      size={32}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                    Technologie
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Solutions digitales complètes : développement web & mobile,
                  infrastructure réseau, systèmes de surveillance et
                  maintenance. Du concept au déploiement.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>• Sites web & applications mobiles</li>
                  <li>• Réseaux</li>
                  <li>• Surveillance & vidéoprotection</li>
                  <li>• Support technique & hébergement</li>
                </ul>
              </li>
            </Link>

            <Link href="/services/electricite" className="block group">
              <li className="p-8 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-transparent hover:border-primary">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Lightning
                      size={32}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-blue-950 dark:text-white">
                    Électricité
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Installations électriques professionnelles pour tous types de
                  bâtiments. Interventions sur basse, moyenne et haute tension
                  avec garantie de conformité.
                </p>
                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li>• Études & chiffrage électrique</li>
                  <li>• Installation & mise en service</li>
                  <li>• Maintenance préventive & corrective</li>
                  <li>• Tableaux & schémas électriques</li>
                </ul>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
