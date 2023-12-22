"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useEffect, useState } from "react";
import supabase from "@/supabase";
import { useRouter, usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

// create Auth context for supabase
export const AuthContext = createContext<any>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("sessionkeeee", session);
        setSession(session);
      } else {
        setSession(null);
        // if route not equal to /auth/login or /auth/register
        if (pathname !== "/auth/login" && pathname !== "/auth/register") {
          router.push("/auth/login");
        }
      }
    });

    return () => {
      subscription.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <html lang="en">
      <AuthContext.Provider value={session}>
        <body className={inter.className}>{children}</body>
      </AuthContext.Provider>
    </html>
  );
}
