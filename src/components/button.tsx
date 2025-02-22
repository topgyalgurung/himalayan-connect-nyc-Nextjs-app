"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export function SignInButton() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "loading") {
    return <>...</>;
  }
  if (status === "authenticated") {
    return (
      <Link href={`/profile`}>
        <Image
          src={session.user?.profilePicture ?? "/mememan.webp"}
          width={32}
          height={32}
          alt="name"
        />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in </button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}
