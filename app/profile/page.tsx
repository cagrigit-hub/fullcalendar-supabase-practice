import Profile from "@/containers/profile";
import serviceSupabase from "@/service-supabase";
import { createClient } from "@supabase/supabase-js";
import React from "react";

async function fetchProfiles() {
  // fetch all users
  const {
    data: { users },
    error,
  } = await serviceSupabase.auth.admin.listUsers();
  if (!error) {
    return users;
  }
  return [];
}

async function Page() {
  const profiles = await fetchProfiles();
  return <Profile profiles={profiles} />;
}

export default Page;
