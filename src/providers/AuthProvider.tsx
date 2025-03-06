"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInRoute } from "@/utilities/Routes";
import { useSessionStore } from "@/store/SessionStore"; // Import store

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const { setSession } = useSessionStore(); // Get session setter

  useEffect(() => {
    // Check if the user is authenticated based on session storage data
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const user = sessionStorage.getItem("user");

    if (accessToken && refreshToken && user) {
      setSession({
        accessToken,
        refreshToken,
        user: JSON.parse(user),
      });
    } else {
      router.replace(signInRoute); // Use replace instead of push to prevent back navigation
    }
  }, [router, setSession]); // No need for `router` in dependencies

  return <>{children}</>;
}
