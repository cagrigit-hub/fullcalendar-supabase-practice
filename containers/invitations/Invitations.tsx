"use client";
import supabase from "@/supabase";
import React from "react";

function Invitations({ invitations }: { invitations: any[] }) {
  return (
    <div>
      {invitations.map((invitation) => {
        return (
          <div key={invitation.id}>
            <div>
              title: {invitation.title} {invitation.id}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={async () => {
                  const { data, error } = await supabase
                    .from("events")
                    .update({ isAccepted: true })
                    .eq("id", invitation.id)
                    .select();
                  if (!data) {
                    alert("error");
                  }
                  if (data) {
                    alert("accepted");
                  }
                }}>
                accept
              </button>
              <button
                onClick={async () => {
                  const { data, error } = await supabase
                    .from("events")
                    .update({ isAccepted: false })
                    .eq("id", invitation.id)
                    .select();
                  if (!error) {
                    alert("rejected");
                  }
                }}>
                reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Invitations;
