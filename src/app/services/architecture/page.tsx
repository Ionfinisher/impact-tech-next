import Image from "next/image";
import Link from "next/link";
import { PencilRuler } from "@phosphor-icons/react/ssr";
import { Footer } from "@/components/Footer";

export default function ServiceArchitecture() {
  return (
    <>
      <div className="container mx-auto px-4 py-20">
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
                  className="relative hover:text-primary text-primary transition-colors py-1 group"
                  href="/services"
                >
                  <span>Services</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-100 origin-center transition-transform"></span>
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
                  href="#"
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
        <div className="flex items-center gap-6 my-8">
          <PencilRuler size={40} weight="duotone" className="text-primary" />
          <h1 className="text-3xl font-bold">Service Architecture</h1>
        </div>

        <p className="text-gray-700 dark:text-white mb-6 max-w-3xl">
          Nos architectes enregistrés conçoivent des plans adaptés, respectant
          normes et budgets. Nous réalisons esquisses, permis, plans d'exécution
          et suivi technique jusqu'à la livraison.
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
      </div>
      <Footer />
    </>
  );
}
