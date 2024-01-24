import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import AppText from "./typography/AppText";
import { FontAwesome } from "@expo/vector-icons";
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

  const categoryScrollRef = useRef<ScrollView>();
  const categoryItemRef = useRef<TouchableOpacity[]>([]);

  const onPressCategory = (index: number) => {
    setActiveIndex(index);
    if (!categoryItemRef.current) return;

    categoryItemRef.current[index].measure((x) => {
      categoryScrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
    });
  };

  return (
    <SafeAreaView className=" bg-white border-b border-gray-100   ">
      <View className="justify-between flex-row px-4  items-center gap-2">
        <View className="bg-white flex-row items-center  px-5 py-3 rounded-full flex-1 border border-gray-200 shadow-md">
          <FontAwesome name="search" size={20} color="black" />

          <View className="ml-4">
            <AppText thick="bold">Where to?</AppText>
            <AppText classNames="text-sm text-gray-500">
              Anywhere • Any week
            </AppText>
          </View>
        </View>

        <TouchableOpacity className="p-2 rounded-full border border-gray-500">
          <Ionicons name="options-outline" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={categoryScrollRef as any}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              className={`items-center py-2 border-b-2 ${
                activeIndex === index ? "border-black" : "border-transparent"
              } `}
              onPress={() => onPressCategory(index)}
              key={index}
              ref={(el: TouchableOpacity) =>
                (categoryItemRef.current[index] = el)
              }
            >
              <MaterialIcons
                name={category.icon as any}
                size={24}
                color={activeIndex === index ? "#000000" : "#aaaaaa"}
              />

              <AppText
                classNames={` text-xs ${
                  activeIndex === index ? "text-black" : "text-[#aaaaaa]"
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
