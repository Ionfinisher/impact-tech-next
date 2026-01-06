import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";

export default function About() {
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
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </nav>
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
                construction, de l'architecture, de l'électricité et de la
                technologie. Notre mission est de simplifier la réalisation de
                vos projets en combinant expertise technique, transparence et
                suivi client.
              </p>

              <h2 className="text-2xl font-semibold mt-6 mb-3">Nos valeurs</h2>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Qualité & conformité aux normes</li>
                <li>Transparence sur les coûts et délais</li>
                <li>Suivi professionnel de A à Z</li>
                <li>Support client et maintenance</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-3">
                Ce que nous offrons
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                De l'étude initiale au suivi de chantier ou au déploiement
                digital, nous proposons des offres modulaires adaptées aux
                besoins et budgets. Nos équipes sont composées d'ingénieurs,
                d'architectes, d'électriciens et de développeurs expérimentés.
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
