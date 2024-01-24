import { View, Text, Pressable } from "react-native";
import React, { ReactElement } from "react";
import { Stack, router } from "expo-router";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";

const layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <Icon
              icon={<Entypo name="chevron-left" size={17} color="black" />}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <View className="justify-between flex-row ">
              <Icon icon={<Feather name="share" size={17} color="black" />} />
              <View className="w-2" />
              <Icon
                icon={<AntDesign name="hearto" size={17} color="black" />}
              />
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="descriptionModal"
        options={{
          presentation: "modal",
          headerLeft: () => (
            <Ionicons name="close" size={20} onPress={() => router.back()} />
          ),
          headerTitle: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default layout;

const Icon = ({
  icon,
  onPress,
}: {
  icon: ReactElement;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      className="p-[7px] rounded-full bg-white border-[0.4px] border-gray-400 shadow-lg justify-between aspect-square"
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
};
