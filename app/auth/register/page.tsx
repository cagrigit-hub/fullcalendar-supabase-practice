"use client";
import React from "react";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the confirmation link");
      router.push("/auth/login");
    }
  };
  return (
    <div className="flex items-center justify-center mt-24">
      <form onSubmit={handleRegister} className="flex flex-col space-y-2 w-80">
        <h1>Register</h1>
        <input className="border border-black" type="email" name="email" />
        <input
          className="border border-black"
          type="password"
          name="password"
        />
        <button className="border border-black" type="submit">
          Register
        </button>
        <div>
          <a href="/auth/login">Login</a>
        </div>
      </form>
    </div>
  );
}

export default Page;
