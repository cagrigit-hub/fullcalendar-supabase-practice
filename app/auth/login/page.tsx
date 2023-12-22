"use client";
import React from "react";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("success");
      router.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center mt-24">
      <form onSubmit={handleLogin} className="flex flex-col space-y-2 w-80">
        <h1>Login</h1>
        <input className="border border-black" type="email" name="email" />
        <input
          className="border border-black"
          type="password"
          name="password"
        />
        <button className="border border-black" type="submit">
          Login
        </button>
        <div>
          <a href="/auth/register">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Page;
