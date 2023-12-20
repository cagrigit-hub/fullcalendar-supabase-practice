"use server";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import Home from "@/containers/home";

async function getInitialEvents() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  let { data, error } = await supabase.from("events").select();
  // @ts-ignore
  data[data.length - 1].start = "2023-12-28T04:47:00";
  // @ts-ignore
  data[data.length - 1].end = "2023-12-28T06:49:00";
  // @ts-ignore
  delete data[data.length - 1].allDay;
  // @ts-ignore
  delete data[data.length - 1].created_at;

  if (!error) {
    return data;
  }
  return [];
}
async function Route() {
  const initialEvents = await getInitialEvents();
  return (
    <div>
      <Home initialEvents={initialEvents} />
    </div>
  );
}

export default Route;
