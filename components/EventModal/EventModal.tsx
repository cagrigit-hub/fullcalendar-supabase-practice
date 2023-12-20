import { DateSelectArg } from "@fullcalendar/core";
import { createClient } from "@supabase/supabase-js";
import React from "react";

function EventModal({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="p-24 flex items-center justify-center absolute z-40 top-[10%] right-[38%] bg-gray-500">
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <input name="titlex" type="text" placeholder="Title" />
        <input name="startTime" type="time" />
        <input name="endTime" type="time" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EventModal;
