import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
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
    const loadOfflineAuth = async () => {
      try {
        const savedAuth = await AsyncStorage.getItem("auth");
        if (savedAuth) {
          setOfflineAuth(JSON.parse(savedAuth));
        }
      } catch (error) {
        console.error("Error loading offline auth data:", error);
      }
    };

    if (!isLoaded) {
      loadOfflineAuth();
    }
  }, [isLoaded]);

  useEffect(() => {
    const saveAuth = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const token = await getToken();
          await AsyncStorage.setItem(
            "auth",
            JSON.stringify({ userId, isSignedIn, token })
          );
        } catch (error) {
          console.error("Error saving auth data:", error);
        }
      } else {
        await AsyncStorage.removeItem("auth");
      }
    };

    saveAuth();
  }, [isLoaded, isSignedIn, userId]);

  return { isLoaded, isSignedIn, offlineAuth };
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn, offlineAuth } = useOfflineAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoaded && offlineAuth) {
      router.replace("/home");
    } else if (!isLoaded) {
      return;
    }

    const isAuthRoute = segments[0] === "(auth)";
    if (isSignedIn && !isAuthRoute) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, offlineAuth]);

  if (!isLoaded && !offlineAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Ładowanie danych...</Text>
      </View>
    );
  }

  if (isOffline && offlineAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Jesteś offline. Korzystasz z zapisanych danych.</Text>
      </View>
    );
  }

  return <Slot />;
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
      setIsOffline(!state.isConnected);
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={publishableKey}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ClerkLoaded>
            <PortalProvider>
              <PortalHost name="menu" />
              <InitialLayout />
            </PortalProvider>
          </ClerkLoaded>
        </ThemeProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
