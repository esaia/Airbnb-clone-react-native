import { ReactElement, useEffect } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";

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

      <Stack.Screen name="listing" options={{ headerShown: false }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
export default RootLayoutNav;
