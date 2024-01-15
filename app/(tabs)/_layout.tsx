import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MainHeader from "@/components/MainHeader";
import { Ionicons, FontAwesome, AntDesign, Octicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

const _layout = () => {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            header: () => <MainHeader />,
            tabBarLabel: "home",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="wishlists"
          options={{
            tabBarLabel: "wishlists",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="heart-o" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="trips"
          options={{
            tabBarLabel: "trips",
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="inbox" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            tabBarLabel: "inbox",
            tabBarIcon: ({ size, color }) => (
              <Octicons name="inbox" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "profile",
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;
