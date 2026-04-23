"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;
    if (email !== "admin@impacttechafrica.com") {
      setIsLoading(false);
      setErrorMessage("Identifiants invalides");
      return;
    }
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        router.push("/app");
        router.refresh();
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage("Identifiants invalides");
        // setErrorMessage(error.message); For debugging only, not user-friendly
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Bon retour!</h1>
            <p className=" text-balance">Connectez vous à votre compte</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="myname@example.com"
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Login"}
          </Button>

          <span
            className={
              errorMessage ? `text-red-400 text-sm font-semibold` : `hidden`
            }
          >
            {errorMessage}
          </span>
        </div>
      </form>
    </div>
  );
}
