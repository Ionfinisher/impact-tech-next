"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/lib/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { redirect, RedirectType } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const email = (e.target as any).email.value;
    const name = (e.target as any).name.value;
    const password = (e.target as any).password.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setIsLoading(false);
      redirect("/app", RedirectType.replace);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Welcome aboard!</h1>
            <p className=" text-balance">Create your account</p>
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
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Sign Up"}
          </Button>

          <div className="text-sm">
            Already have an account?{" "}
            <a href="/" className="underline underline-offset-4">
              Sign in
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
