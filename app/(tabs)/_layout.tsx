import { StatusBar, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import MainHeader from "@/components/MainHeader";
import {
  Ionicons,
  FontAwesome,
  AntDesign,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

const _layout = () => {
  return (
    <View className="flex-1">
      <StatusBar barStyle={"dark-content"} />

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#e22d33",

          tabBarStyle: {
            backgroundColor: "white",
            paddingBottom: 40,
            height: 90,
            borderTopColor: "#dedbdb",
            borderTopWidth: 1,
          },
        }}
        initialRouteName="home"
      >
        <Tabs.Screen
          name="index"
          options={{
            header: () => <MainHeader />,
            tabBarLabel: ({ color, focused }) => (
              <Text
                className="text-xs "
                style={{
                  color,
                  fontFamily: focused ? "MontserratBold" : "MontserratRegular",
                }}
              >
                Explore
              </Text>
            ),
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="wishlists"
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text
                className="text-xs "
                style={{
                  color,
                  fontFamily: focused ? "MontserratBold" : "MontserratRegular",
                }}
              >
                WishLists
              </Text>
            ),
            tabBarIcon: ({ size, color, focused }) => (
              <FontAwesome name="heart-o" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="trips"
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text
                className="text-xs "
                style={{
                  color,
                  fontFamily: focused ? "MontserratBold" : "MontserratRegular",
                }}
              >
                Trips
              </Text>
            ),
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="airbnb" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text
                className="text-xs "
                style={{
                  color,
                  fontFamily: focused ? "MontserratBold" : "MontserratRegular",
                }}
              >
                Inbox
              </Text>
            ),
            tabBarIcon: ({ size, color }) => (
              <Feather name="message-square" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: ({ color, focused }) => (
              <Text
                className="text-xs "
                style={{
                  color,
                  fontFamily: focused ? "MontserratBold" : "MontserratRegular",
                }}
              >
                Profile
              </Text>
            ),
            headerShown: false,

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
