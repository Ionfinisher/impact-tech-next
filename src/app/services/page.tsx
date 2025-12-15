import Link from "next/link";
import Image from "next/image";
import {
  HardHat,
  PencilRuler,
  Lightning,
  Laptop,
} from "@phosphor-icons/react/ssr";

export default function ServicesIndex() {
  return (
    <div className="container mx-auto px-4 py-24">
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
      <h1 className="text-4xl font-bold my-6">Nos services</h1>
      <p className="mb-8 max-w-2xl text-gray-300  dark:text-white">
        Découvrez nos quâtre pôles d'expertise. Cliquez pour voir les détails de
        chaque service.
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-6">
        <Link href="/services/bc" className="block">
          <li className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <HardHat size={24} weight="duotone" className="text-primary" />
              <h2 className="text-xl font-semibold mb-2">
                Bâtiment & Construction
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Main d'oeuvre, matériaux, chantier.
            </p>
          </li>
        </Link>

        <Link href="/services/architecture" className="block">
          <li className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <PencilRuler
                size={24}
                weight="duotone"
                className="text-primary"
              />
              <h2 className="text-xl font-semibold mb-2">Architecture</h2>
            </div>
            <p className="text-sm text-gray-500">
              Plans, études, suivi d'exécution.
            </p>
          </li>
        </Link>

        <Link href="/services/technology" className="block">
          <li className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <Laptop size={24} weight="duotone" className="text-primary" />
              <h2 className="text-xl font-semibold mb-2">Technologie</h2>
            </div>
            <p className="text-sm text-gray-500">
              Sites, apps, réseaux et surveillance.
            </p>
          </li>
        </Link>

        <Link href="/services/electricite" className="block">
          <li className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
            <div className="flex items-center space-x-3 mb-2">
              <Lightning size={24} weight="duotone" className="text-primary" />
              <h2 className="text-xl font-semibold">Électricité</h2>
            </div>
            <p className="text-sm text-gray-500">
              Installation, maintenance et plans électriques.
            </p>
          </li>
        </Link>
      </ul>
    </div>
  );
}
