import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Import z własnego hooka do rozpoznawania dark/light mode
import { useColorScheme } from '@/components/useColorScheme';

// Exporty ErrorBoundary, jeśli chcesz przechwytywać błędy
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Ustawienia Expo Router – trasę startową ustawiamy na (tabs)
export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Zapobiega automatycznemu chowaniu ekranu splash
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // Ładujemy fonty (SpaceMono oraz FontAwesome)
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'), // Dostosuj ścieżkę do fontów
    ...FontAwesome.font,
  });

  // Rzuć błąd, jeśli fontError istnieje
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Gdy fonty są załadowane, chowamy splash screen
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Możesz zwrócić placeholder, spinner itp.
    return null;
  }

  return <RootStackNavigator />;
}

function RootStackNavigator() {
  // Hook do sprawdzania, czy systemowy motyw jest dark czy light
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Ekran główny: (tabs) – układ z zakładkami */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Modal – wyświetlany w trybie modalnym */}
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />

        {/* Możesz dodać tu inne ekrany lub foldery, np.:
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/register" />
         */}
      </Stack>
    </ThemeProvider>
  );
}
