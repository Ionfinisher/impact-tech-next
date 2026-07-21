import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  PhoneCall,
  Envelope,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from "@phosphor-icons/react/ssr";

export function Footer() {
  return (
    <>
      <footer className="bg-blue-950 text-white pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
            <div>
              <Link className="text-2xl font-black text-white" href="/">
                <Image
                  width={100}
                  height={100}
                  alt="Impact Techs logo"
                  className="h-10 w-auto"
                  src="/images/LOGO-IMPACT-TECH.png"
                />
              </Link>
              <p className="mt-4 text-gray-300 text-sm">
                Notre application relie efficacement les utilisateurs à une
                vaste gamme de services de confiance.
              </p>
              <div className="flex space-x-4 mt-6">
                <Link
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-600 rounded-full hover:bg-primary hover:border-[#0d1b33] hover:text-blue-950 transition-colors"
                  href="#"
                >
                  <FacebookLogo
                    size={32}
                    weight="duotone"
                    className="text-primary"
                  />
                </Link>
                <Link
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-600 rounded-full hover:bg-primary hover:border-[#0d1b33] hover:text-blue-950 transition-colors"
                  href="#"
                >
                  <TwitterLogo
                    size={32}
                    weight="duotone"
                    className="text-primary"
                  />
                </Link>
                <Link
                  className="w-10 h-10 flex items-center justify-center border-2 border-gray-600 rounded-full hover:bg-primary hover:border-[#0d1b33] hover:text-blue-950 transition-colors"
                  href="#"
                >
                  <InstagramLogo
                    size={32}
                    weight="duotone"
                    className="text-primary"
                  />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wider">CONTACT</h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <PhoneCall
                    size={20}
                    weight="duotone"
                    className="text-primary"
                  />
                  <span>+228 70 57 78 03</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Envelope
                    size={20}
                    weight="duotone"
                    className="text-primary"
                  />
                  <span>contact@impacttechafrica.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wider">
                LIENS UTILES
              </h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/about"
                  >
                    A Propos
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/services"
                  >
                    Nos services
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/news"
                  >
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wider">LEGALES</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/conditions-generales"
                  >
                    Conditions Générales d'Utilisation
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="/politique-confidentialite"
                  >
                    Politique de Confidentialité
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold tracking-wider">ADRESSES</h4>
              <p className="mt-4 text-sm text-gray-300">
                Gbossimé, Rue des Equinoxes, Lomé-Togo
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
            <p>© 2025 Impact Techs. Tous droits réservés.</p>
          </div>
        </div>

        <Link
          className="fixed z-50 bottom-5 right-5 w-12 h-12 bg-primary text-gray-300/70 flex items-center justify-center rounded-full shadow-lg hover:bg-[#c2a356] transition-colors"
          href="#head"
        >
          <ArrowUp size={24} weight="duotone" />
        </Link>
      </footer>
    </>
  );
}
