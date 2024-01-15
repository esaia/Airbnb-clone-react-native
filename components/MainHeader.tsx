import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AppText from "./typography/AppText";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const MainHeader = () => {
  const categories = [
    {
      name: "Tiny homes",
      icon: "home",
    },
    {
      name: "Cabins",
      icon: "house-siding",
    },
    {
      name: "Trending",
      icon: "local-fire-department",
    },
    {
      name: "Play",
      icon: "videogame-asset",
    },
    {
      name: "City",
      icon: "apartment",
    },
    {
      name: "Beachfront",
      icon: "beach-access",
    },
    {
      name: "Countryside",
      icon: "nature-people",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="  bg-gray-200  shadow-lg">
      <View className="justify-between flex-row p-4 items-center gap-10">
        <View className="bg-white flex-row items-center  p-4 rounded-full flex-1 border border-gray-200 ">
          <AntDesign name="search1" size={24} color="black" />

          <View className="ml-5">
            <AppText thick="bold">Where to?</AppText>
            <AppText>Anywhere • Any week</AppText>
          </View>
        </View>

        <TouchableOpacity className="p-4 rounded-full border border-gray-500">
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingHorizontal: 16,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              className={`items-center py-2 border-b-2 border-transparent  ${
                activeIndex === index && "border-black"
              }`}
              onPress={() => setActiveIndex(index)}
              key={index}
            >
              <MaterialIcons
                name={category.icon as any}
                size={24}
                color={activeIndex === index ? "#000000" : "#707070"}
              />

              <AppText
                classNames={` ${
                  activeIndex === index ? "text-black" : "text-[color-[#707070]"
                }`}
              >
                {category.name}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainHeader;
