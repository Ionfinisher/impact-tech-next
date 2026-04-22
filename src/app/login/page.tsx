import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/COMPIL.png" // Replace with your image path
        alt="Background"
        fill
        quality={75}
        priority
        className="absolute inset-0 z-0 object-cover"
      />

      {/* Overlay to darken the background slightly for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Content Wrapper - Aligns content block to center (xs) or left (sm+) and vertically centers */}
      <div className="relative z-20 flex justify-center sm:justify-start items-center min-h-screen">
        {/* Form & Branding Container - Positioned on the left with padding, no card styles */}
        <div className="w-full max-w-md p-8 sm:p-10 md:p-12 lg:p-16">
          {/* App Name and Branding */}
          <div className="text-center sm:text-left mb-8">
            {/* You can use an Image component for a logo */}
            {/* <Image src="/logo.png" alt="App Logo" width={150} height={50} className="mx-auto mb-2 sm:mx-0" /> */}
            <h1 className="text-4xl font-bold text-white">Impact Tech</h1>
            <p className="text-gray-200">Administration</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
