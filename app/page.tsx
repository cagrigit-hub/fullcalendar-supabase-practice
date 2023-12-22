import Link from "next/link";
import React from "react";

async function Route() {
  return (
    <div>
      <div>Welcome</div>
      <Link href="/profile">
        <div>Profile</div>
      </Link>
    </div>
  );
}

export default Route;
