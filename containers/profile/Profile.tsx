import Link from "next/link";
import React from "react";

function Profile({ profiles }: { profiles: any }) {
  return (
    <div>
      {profiles.map((profile: any) => {
        return (
          <Link key={profile.id} href={`/events/${profile.id}`}>
            <div>{profile.email}</div>
          </Link>
        );
      })}
    </div>
  );
}

export default Profile;
