import React from "react";
import Home from "@/containers/home";
import serviceSupabase from "@/service-supabase";
export const dynamic = "force-dynamic";

async function getInitialEvents(params: any) {
  const { userId } = params;

  let { data, error } = await serviceSupabase
    .from("events")
    .select("*")
    .eq("to_id", userId)
    .eq("isAccepted", true);
  if (!error) {
    data?.push({
      id: "1",
      title: "selamlar",
      start: "2023-11-06",
      end: "2023-11-08",
      overlap: false,
      extendendProps: {
        onlyClickableByOwner: true,
      },
      display: "background",
    });
    return data;
  }
  return [];
}

async function Route({ params }: { params: { userId: string } }) {
  const initialEvents = await getInitialEvents(params);
  return (
    <div>
      <Home initialEvents={initialEvents} />
    </div>
  );
}

export default Route;
