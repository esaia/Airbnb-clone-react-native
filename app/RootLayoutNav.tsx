import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "@/components/Icon";
import AppText from "@/components/typography/AppText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push("/(modals)/loginModal");
    // else router.replace("/(tabs)/index");
  }, [isLoaded]);

  const { top } = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/loginModal"
        options={{
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

          //   gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          header: () => (
            <View
              className=" flex-row justify-between items-center p-5  h-28 relative "
              style={{ paddingTop: top }}
            >
              <View className="flex-1">
                <Icon
                  onPress={() => router.push("/")}
                  icon={<Ionicons name="close" size={17} />}
                />
              </View>

              <View className="flex-1 items-center flex-row space-x-3">
                <AppText thick="bold" classNames=" text-lg ">
                  Stays
                </AppText>
                <AppText thick="bold" classNames="text-gray-500 text-lg">
                  Experiences
                </AppText>
              </View>
              <View className="flex-1" />
            </View>
          ),
          animation: "fade",
          headerTransparent: true,
          presentation: "transparentModal",
          headerTitleStyle: {
            fontFamily: "MontserratRegular",
          },
          // headerLeft: () => (
          //   <Icon
          //     onPress={() => router.push("/")}
          //     icon={<Ionicons name="close" size={17} />}
          //   />
          // ),
        }}
      />

      <Stack.Screen name="listing" options={{ headerShown: false }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
export default RootLayoutNav;
