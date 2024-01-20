import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import MainHeader from "@/components/MainHeader";

const layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default layout;
