import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  createContext,
  startTransition,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import "react-native-reanimated";
import { Slot, useRouter, useSegments } from "expo-router";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useColorScheme } from "@/components/useColorScheme";
import { PortalHost, PortalProvider } from "@gorhom/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

enableScreens();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(auth)",
};

SplashScreen.preventAutoHideAsync();

const useOfflineAuth = () => {
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();
  const [offlineAuth, setOfflineAuth] = useState<null | {
    isSignedIn: boolean;
    token: string;
  }>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOfflineAuth = async () => {
      try {
        const savedAuth = await AsyncStorage.getItem("auth");
        if (savedAuth && isMounted) {
          startTransition(() => {
            setOfflineAuth(JSON.parse(savedAuth));
          });
        }
      } catch (error) {
        console.error("Error loading offline auth data:", error);
      }
    };

    if (!isLoaded) {
      loadOfflineAuth();
    }

    return () => {
      isMounted = false; // Cleanup to avoid state updates after component unmount.
    };
  }, [isLoaded]);

  useEffect(() => {
    let isMounted = true;

    const saveAuth = async () => {
      try {
        if (isLoaded && isSignedIn) {
          const token = await getToken();
          if (isMounted) {
            await AsyncStorage.setItem(
              "auth",
              JSON.stringify({ userId, isSignedIn, token })
            );
          }
        } else if (isMounted) {
          await AsyncStorage.removeItem("auth");
        }
      } catch (error) {
        console.error("Error saving auth data:", error);
      }
    };

    saveAuth();

    return () => {
      isMounted = false; // Cleanup to prevent updates to unmounted components.
    };
  }, [isLoaded, isSignedIn, userId]);

  return { isLoaded, isSignedIn, offlineAuth };
};

type RedirectContextType = {
  hasRedirected: boolean;
  setHasRedirected: (value: boolean) => void;
};

const RedirectContext = createContext<RedirectContextType | undefined>(
  undefined
);

export const RedirectProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [hasRedirected, setHasRedirected] = useState(false);

  return (
    <RedirectContext.Provider value={{ hasRedirected, setHasRedirected }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => {
  const context = useContext(RedirectContext);
  if (!context) {
    throw new Error("useRedirect must be used within a RedirectProvider");
  }
  return context;
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!isLoaded || isWaiting) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, isWaiting]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      startTransition(() => {
        setIsOffline(!state.isConnected);
      });
    });

    return () => unsubscribe();
  }, []);

  if (isOffline) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <PortalProvider>
            <PortalHost name="menu" />
            <InitialLayout />
          </PortalProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <RedirectProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ClerkProvider publishableKey={publishableKey}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            {/* <Suspense fallback={<Text>Loading App...</Text>}> */}
              <ClerkLoaded>
                <PortalProvider>
                  <PortalHost name="menu" />
                  <InitialLayout />
                </PortalProvider>
              </ClerkLoaded>
            {/* </Suspense> */}
          </ThemeProvider>
        </ClerkProvider>
      </GestureHandlerRootView>
    </RedirectProvider>
  );
}
