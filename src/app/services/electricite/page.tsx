import Image from "next/image";
import Link from "next/link";
import { Lightning } from "@phosphor-icons/react/ssr";

export default function ServiceElectricite() {
  return (
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
      <div className="flex items-center gap-4 my-8">
        <Lightning size={40} weight="duotone" className="text-primary" />
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
    </div>
  );
}
