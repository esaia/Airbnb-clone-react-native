import { View } from "react-native";
import React from "react";
import AppText from "@/components/typography/AppText";

const PrimaryButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="rounded-lg overflow-hidden">
      <AppText classNames="p-3 text-center bg-primary text-lg text-gray-100 ">
        {children}
      </AppText>
    </View>
  );
};

export default PrimaryButton;
