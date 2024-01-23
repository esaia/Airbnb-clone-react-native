import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const unstable_settings = {
  initialRouteName: "(tabs)",
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
    MontserratLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
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

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <BottomSheetModalProvider>
        <RootLayoutNav />
      </BottomSheetModalProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/(modals)/loginModal");
    // else router.replace("/(tabs)/index");
  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/loginModal"
        options={{
          headerShadowVisible: false,
          headerTitle: "login",
          presentation: "modal",
          headerTitleStyle: {
            fontFamily: "MontserratRegular",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={25} />
            </TouchableOpacity>
          ),

          gestureEnabled: false,
        }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
