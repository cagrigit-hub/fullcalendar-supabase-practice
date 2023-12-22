import Link from "next/link";
import React from "react";

function Profile({ profiles }: { profiles: any }) {
  return (
    <div>
      {profiles.map((profile: any) => {
        return (
          <div key={profile.id}>
            <Link href={`/events/${profile.id}`}>
              <div>calendar: {profile.email}</div>
            </Link>
            <Link href={`/invitations/${profile.id}`}>
              <div>invitations: {profile.email}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
