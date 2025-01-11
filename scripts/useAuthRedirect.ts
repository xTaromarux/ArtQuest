import { startTransition, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Router } from "expo-router";

interface AuthRedirectProps {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  router: Router;
  segments: string[];
}

export const useAuthRedirect = ({
  isSignedIn,
  isLoaded,
  router,
  segments,
}: AuthRedirectProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const initializeAuthState = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (token) {
          console.log("Token found, setting as valid");
          startTransition(() => {
            setIsTokenValid(true);
          });
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        startTransition(() => {
          setIsInitialized(true);
        });
      }
    };

    initializeAuthState();
  }, []);

  useEffect(() => {
    if (!isLoaded || !isInitialized) return;
    if (segments[0] === undefined || segments[0] === null) return;

    console.log("segments ");
    console.log(segments);
    console.log("isSignedIn");
    console.log(isSignedIn);
    console.log("isTokenValid");
    console.log(isTokenValid);
    console.log("_____________");

    const isAuthRoute = segments[1] === "sign-in" || segments[1] === "sign-up";
    const isHomeRoute = segments[1] === "home";
    const isLogoutRoute = segments[1] === "profile";

    if ((isSignedIn || isTokenValid) && isAuthRoute) {
      router.replace("/home");
    } else if ((!isTokenValid && isLogoutRoute) || (!isSignedIn && !isAuthRoute || isSignedIn && !isTokenValid && !isAuthRoute)) {
      router.replace("/");
    }
  }, [isLoaded, isInitialized, isSignedIn, isTokenValid, segments, router]);
};
