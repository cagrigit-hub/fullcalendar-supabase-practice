import Invitations from "@/containers/invitations";
import serviceSupabase from "@/service-supabase";
import React from "react";
export const dynamic = "force-dynamic";

async function fetchInvitations(userId: string) {
  const { data, error } = await serviceSupabase
    .from("events")
    .select("*")
    .eq("to_id", userId);
  if (!error) {
    return data;
  }
  return [];
}

async function Page({ params }: { params: { userId: string } }) {
  const invitations = await fetchInvitations(params.userId);
  return <Invitations invitations={invitations} />;
}

export default Page;
