import Image from "next/image";
import Link from "next/link";
import {
  ArrowCircleUp,
  ArrowRight,
  ArrowUp,
  HardHat,
  PencilRuler,
  Lightning,
  Laptop,
  User,
  ListChecks,
  Tag,
  Pencil,
  Play,
  PhoneCall,
  Envelope,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
} from "@phosphor-icons/react/ssr";

export default function Home() {
  return (
    <div
      className="bg-background-light dark:bg-background-dark text-blue-950 dark:text-gray-200"
      id="head"
    >
      <header className="absolute top-0 left-0 right-0 z-50 py-6">
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
                className="relative hover:text-primary text-primary transition-colors py-1 group"
                href="#"
              >
                <span>Accueil</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-100 origin-center transition-transform"></span>
              </Link>
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
                href="#"
              >
                <span>A Propos</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
              </Link>
              <Link
                className="relative hover:text-primary transition-colors py-1 group"
                href="#"
              >
                <span>Services</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300"></span>
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
      <main>
        <section className="relative text-white min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/COMPIL.png')]"></div>
          <div className="absolute inset-0"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 border-50 border-[#0d1b33]/10 rounded-full opacity-50"></div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10 grid md:grid-cols-2 gap-8 items-center pt-24 pb-12">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Simplifiez vos projets dans
                <br /> <span className="text-primary">La technologie</span>
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto md:mx-0">
                Notre application innovante relie efficacement les utilisateurs
                à une vaste gamme de services de confiance dans le domaine du BC
                (Bâtiments construction), de l'architecture, l'électricité et de
                la technologie.
              </p>
            </div>
            <div className="relative flex justify-center">
              <Image
                alt="Impact Tech mobile app mockup"
                className="w-full max-w-xs md:max-w-xs lg:max-w-xs"
                src="/images/home_page-left.png"
                width={720}
                height={720}
              />
            </div>
          </div>
        </section>
        <section className="relative flex flex-col lg:flex-row items-center justify-center gap-12 py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
          <p className="mb-4 font-medium text-2xl tracking-wide">
            Bientôt disponible sur
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="#">
              <Image
                alt="Get it on Google Play badge"
                className="h-24"
                src="/images/App-Store.png"
                width={324}
                height={145}
              />
            </Link>
            <Link href="#">
              <Image
                alt="Available on the App Store badge"
                className="h-24"
                src="/images/Google-Play.png"
                width={324}
                height={145}
              />
            </Link>
          </div>
        </section>
        <section className="relative py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold tracking-wider">
                NOS SERVICES
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mt-2">
                Faciliter la réalisation de vos projets est notre devoir
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group relative border border-blue-bg-blue-950/10 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-4 justify-center flex">
                    <HardHat
                      size={92}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Service Bâtiment Construction
                  </h3>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-blue-950 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <h4 className="font-bold text-lg text-primary mb-2">
                    Service BC
                  </h4>
                  <p className="text-sm text-gray-300">
                    Pour vos projets de Bâtiment Construction, nous mettons à
                    votre disposition des ouvriers qualifiés, des matériaux de
                    construction, des véhicules et bien d'autres
                  </p>
                </div>
              </div>
              <div className="group relative border border-blue-bg-blue-950/10 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-4 justify-center flex">
                    <PencilRuler
                      size={92}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Service Architecture
                  </h3>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-blue-950 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <h4 className="font-bold text-lg text-primary mb-2">
                    Architecture
                  </h4>
                  <p className="text-sm text-gray-300">
                    Nous mettons à votre disposition les services d'architectes
                    reconnus par l'Etat pour vos projets de constructions
                  </p>
                </div>
              </div>
              <div className="group relative border border-blue-bg-blue-950/10 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-4 justify-center flex">
                    <Lightning
                      size={92}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Service Electricité</h3>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-blue-950 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <h4 className="font-bold text-lg text-primary mb-2">
                    Électricité
                  </h4>
                  <p className="text-sm text-gray-300">
                    Nous mettons à votre disposition les services d'ingénieurs
                    d'électricité haute, moyenne et basse tension.
                  </p>
                </div>
              </div>
              <div className="group relative border border-blue-bg-blue-950/10 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <div className="bg-primary/10 p-4 rounded-full mb-4 justify-center flex">
                    <Laptop
                      size={92}
                      weight="duotone"
                      className="text-primary"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Service Technologie</h3>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center bg-blue-950 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                  <h4 className="font-bold text-lg text-primary mb-2">
                    Technologie
                  </h4>
                  <p className="text-sm text-gray-300">
                    Nous disposons d'ingénieurs qualifiés pour vos projets de
                    sites internet, d'applications, d'installations réseaux,
                    caméra de surveillances...
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                className="inline-block px-8 py-3 border border-blue-bg-blue-950 dark:border-gray-400 rounded-full font-semibold text-blue-950 dark:text-gray-200 hover:bg-blue-950 hover:text-white dark:hover:bg-primary dark:hover:border-[#0d1b33] dark:hover:text-blue-950 transition-colors duration-300"
                href="#"
              >
                Tous les services
              </Link>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-32 bg-[#f7f7f7] dark:bg-gray-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-blue-950 dark:text-white leading-snug">
                  Pourquoi nous faire confiance pour vos divers projets
                </h2>
                <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-lg">
                  Nous combinons expertise technique et engagement client pour
                  garantir des résultats exceptionnels, en respectant les délais
                  et votre budget.
                </p>
              </div>
              <div>
                <div className="aspect-video bg-blue-950 dark:bg-black rounded-xl overflow-hidden shadow-2xl relative group cursor-pointer">
                  <video id="video">
                    <source src="/videos/main-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      id="play"
                      className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300"
                    >
                      <Play size={24} weight="duotone" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white">
                  Comment ça fonctionne ?
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Un processus simple en 4 étapes pour vous connecter aux
                  meilleurs services, rapidement et efficacement.
                </p>
              </div>
              <div>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-6 p-4 rounded-lg bg-[#f7f7f7]/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#0d1b33]/20 dark:border-[#0d1b33]/30 rounded-full bg-background-light dark:bg-gray-800 flex-shrink-0">
                      <User
                        size={24}
                        weight="duotone"
                        className="dark:text-primary"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Étape 1</p>
                      <span className="text-xl font-bold">Se connecter</span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-6 p-4 rounded-lg bg-[#f7f7f7]/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#0d1b33]/20 dark:border-[#0d1b33]/30 rounded-full bg-background-light dark:bg-gray-800 flex-shrink-0">
                      <ListChecks size={24} weight="duotone" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Étape 2</p>
                      <span className="text-xl font-bold">
                        Choisir un service
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-6 p-4 rounded-lg bg-[#f7f7f7]/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#0d1b33]/20 dark:border-[#0d1b33]/30 rounded-full bg-background-light dark:bg-gray-800 flex-shrink-0">
                      <Tag
                        size={24}
                        weight="duotone"
                        className="dark:text-primary"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Étape 3</p>
                      <span className="text-xl font-bold">
                        Choisir une offre
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center space-x-6 p-4 rounded-lg bg-[#f7f7f7]/50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#0d1b33]/20 dark:border-[#0d1b33]/30 rounded-full bg-background-light dark:bg-gray-800 flex-shrink-0">
                      <Pencil
                        size={24}
                        weight="duotone"
                        className="dark:text-primary"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">Étape 4</p>
                      <span className="text-xl font-bold">
                        Faire une demande
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-32 bg-blue-950 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold max-w-4xl mx-auto">
              Explorez nos services dès maintenant et découvrez comment nous
              pouvons vous aider à concrétiser vos projets en toute simplicité.
            </h2>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold tracking-wider">
                IMPACT TECH NEWS
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white mt-2">
                Les dernières actualités
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background-light dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col group">
                <div className="overflow-hidden">
                  <Image
                    width={300}
                    height={200}
                    alt="An architect in a yellow hard hat reviewing blueprints on a construction site"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuALxB6F1UJevbC4hxRpF91J7uTOqZOt4IJQdblX2HUsQcTvzFOKq5HmM-GaAIZU6YLst5T9TNCu3_44bZi7nJkTwCjXQewx8QhP5sT8uTN-_Bqc6o1H_S0fmPAdyirqsKBBREnAj7aCW9nwHw3BR2dFe_KHOFuy8St4f9bBbIw5qX4YqaiVIcaYTkazs_rPO2rBbo305Cfjwk4-slvyIsy6CGmTDSn79tW-DC1IhvTDBp8zkP8AEM8R75soz16Gq1kuXZvo_Pb336Y"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-950 dark:text-white group-hover:text-primary transition-colors">
                    Service Architecture
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    18 mars 2025 / Aucun commentaire
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 flex-grow">
                    Savez-vous qu'un être humain passe en moyenne 5/6 de son
                    temps dans un bâtiment? Le bâtiment est notre espace de vie
                    quotidien...
                  </p>
                  <Link
                    className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-2 bg-blue-950 text-white rounded-full text-center font-medium hover:bg-primary hover:text-[#c2a356] transition-colors w-full sm:w-auto"
                    href="#"
                  >
                    <span>Lire plus</span>
                    <ArrowRight
                      size={32}
                      weight="duotone"
                      className="text-white hover:text-[#c2a356]"
                    />
                  </Link>
                </div>
              </div>
              <div className="bg-background-light dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col group">
                <div className="overflow-hidden">
                  <Image
                    width={300}
                    height={200}
                    alt="A software engineer working on a computer in a dark room"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT2qthi9GGcFvpDG_9bMi8FmtmCuusOhVQ8MuU0yCmwTJnbc65Oj3HIQD4oJ2uVi8hdDE_m4XTtgkYHa9AU47QpebvYIhJ2my87450CO_WCWK93nGm8x8OZ7zDqtx4q-jXQm5VEBP_SNwt_dQuMt8eU1teHN3cOP4skSrZcP7B6cOOJoN0NpJrp46CPuN26eXVWkrWw5qjO5mB-DQImnEVH_o0OsURyMwfor1elBSRZ5ruBRqqZDHCmEZmbFaRu1vccBbQIDkQA4g"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-950 dark:text-white group-hover:text-primary transition-colors">
                    Service Technologie
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    23 février 2025 / Aucun commentaire
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 flex-grow">
                    Notre service technologie propose une gamme complète de
                    solutions adaptées aux besoins des entreprises et des
                    particuliers. Nous offrons...
                  </p>
                  <Link
                    className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-2 bg-blue-950 text-white rounded-full text-center font-medium hover:bg-primary hover:text-[#c2a356] transition-colors w-full sm:w-auto"
                    href="#"
                  >
                    <span>Lire plus</span>
                    <ArrowRight
                      size={32}
                      weight="duotone"
                      className="text-white hover:text-[#c2a356]"
                    />
                  </Link>
                </div>
              </div>
              <div className="bg-background-light dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col group">
                <div className="overflow-hidden">
                  <Image
                    width={300}
                    height={200}
                    alt="An electrician working on a complex electrical panel"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVgUiurGUhmSMpAp05vAl0KzCYsc7_-0drXXVjtsuAJlty7WYSCrzIFUeYenN9BepcJ1UQ9UrDfFao49Uzj7eFr_0obvAfH5UmgTyWSmpN9CdyZ7XFCC2TuG4_xwxTSsHrDEi5fFgJxEjjK5IDYxXSvsdYrPitQG5MjENFqp54r3ZHJGLLxcyUq1WtzgFbEujrVElnp-P7FGR7FxKnAx7NLk-FGlK60ohfwqc5W-hism5OWuI49KWAY5hdumAAWTGQNtZpc_WVwUI"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-950 dark:text-white group-hover:text-primary transition-colors">
                    Service Électricité
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    23 février 2025 / Aucun commentaire
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 flex-grow">
                    Notre service d'électricité propose une gamme complète de
                    solutions adaptées aux besoins des particuliers, incluant
                    l'installation, l'élaboration de plans électriques, la...
                  </p>
                  <Link
                    className="inline-flex items-center justify-center gap-2 mt-6 px-6 py-2 bg-blue-950 text-white rounded-full text-center font-medium  hover:text-[#c2a356] transition-colors w-full sm:w-auto"
                    href="#"
                  >
                    <span>Lire plus</span>
                    <ArrowRight
                      size={32}
                      weight="duotone"
                      className="text-white hover:text-[#c2a356]"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                className="font-medium text-blue-950 dark:text-gray-200 hover:text-primary dark:hover:text-primary border-b-2 border-transparent hover:border-[#0d1b33] pb-1 transition-all"
                href="#"
              >
                Voir plus d'actualités
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-[#f7f7f7] dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 dark:text-white">
              Devenons partenaires
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Vous êtes fournisseurs de services dans l'un des domaines où nous
              opérons et vous voulez apporter vos solutions à une multitude,
              travaillons ensemble. Contactez-nous dès maintenant
            </p>
            <div className="mt-8">
              <Link
                className="inline-block px-8 py-3 bg-blue-950 text-white rounded-full font-semibold hover:bg-primary hover:text-[#c2a356] transition-colors duration-300 shadow-lg"
                href="#"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-blue-950 text-white pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
            <div>
              <Link className="text-2xl font-black text-white" href="/">
                <Image
                  width={100}
                  height={100}
                  alt="Impact Tech logo"
                  className="h-10 w-auto"
                  src="/images/LOGO-IMPACT-TECH.png"
                />
              </Link>
              <p className="mt-4 text-gray-300 text-sm">
                Notre application innovante relie efficacement les utilisateurs
                à une vaste gamme de services de confiance...
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
              <h4 className="text-lg font-semibold tracking-wider">ADRESSES</h4>
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
                  <span>impacttech@gmail.com</span>
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
                    href="#"
                  >
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="#"
                  >
                    A Propos
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="#"
                  >
                    Nos services
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="#"
                  >
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-300 hover:text-[#c2a356] transition-colors"
                    href="#"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
          <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400">
            <p>© 2025 Impact Tech. Tous droits réservés.</p>
          </div>
        </div>
        <Link
          className="fixed z-50 bottom-5 right-5 w-12 h-12 bg-primary text-gray-300/70 flex items-center justify-center rounded-full shadow-lg hover:bg-[#c2a356] transition-colors"
          href="#head"
        >
          <ArrowUp size={24} weight="duotone" />
        </Link>
      </footer>
    </div>
  );
}
