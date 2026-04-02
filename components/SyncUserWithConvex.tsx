"use client";

import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export function SyncUserWithConvex() {
  const { isSignedIn } = useAuth();
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    if (isSignedIn) {
      storeUser();
    }
  }, [isSignedIn, storeUser]);

  return null;
}
