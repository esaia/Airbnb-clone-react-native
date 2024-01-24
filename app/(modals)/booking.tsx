import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { ReactElement, useState } from "react";
import { BlurView } from "expo-blur";
import AppText from "@/components/typography/AppText";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const booking = () => {
  const [destination, setDestination] = useState("");
  const [activeCard, setActiveCard] = useState(0);

  const worldCrouselData = [
    {
      title: "I'm flexible",
      imgage_url: require("@/assets/images/world/world.jpg"),
    },
    {
      title: "Europe",
      imgage_url: require("@/assets/images/world/Europe.jpg"),
    },

    {
      title: "Italy",
      imgage_url: require("@/assets/images/world/Italy.jpg"),
    },

    {
      title: "South America",
      imgage_url: require("@/assets/images/world/SouthAmerica.jpg"),
    },

    {
      title: "Turkey",
      imgage_url: require("@/assets/images/world/Turkey.jpg"),
    },

    {
      title: "United States",
      imgage_url: require("@/assets/images/world/UnitedStates.jpg"),
    },
  ];

  return (
    <BlurView
      intensity={80}
      tint="light"
      className="flex-1 p-5  pt-28  flex-col"
    >
      {activeCard === 0 && (
        <CardWrapper>
          <View className="flex-1 space-y-4 flex-col ">
            <AppText thick="bold" classNames="text-xl">
              Where to?
            </AppText>

            <View className="border border-gray-300 rounded-xl flex-row items-center p-5 space-x-2">
              <Ionicons name="search" size={20} />

              <TextInput
                onChangeText={(value) => setDestination(value)}
                value={destination}
                placeholder="Search destination"
                placeholderTextColor={"gray"}
              />
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="flex-row  space-x-3  w-[calc(100%+24px)]   mx-[-24px] pl-6"
              snapToInterval={140}
              snapToAlignment={"start"}
            >
              {worldCrouselData.map((item) => {
                return (
                  <View key={item.title} className=" w-32 max-w-32  ">
                    <Image
                      source={item.imgage_url}
                      style={{ borderColor: "#D1D5DB" }}
                      className="w-full h-32 rounded-lg mb-2 border"
                    />
                    <AppText>{item.title}</AppText>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </CardWrapper>
      )}

      {activeCard !== 0 && <Card titleOne="Where" titleTwo="I'm flexible" />}
      {activeCard !== 1 && <Card titleOne="When" titleTwo="Any week" />}
      {activeCard !== 2 && <Card titleOne="Who" titleTwo="Add guests" />}
    </BlurView>
  );
};

export default booking;

const Card = ({
  titleOne,
  titleTwo,
}: {
  titleOne: string;
  titleTwo: string;
}) => {
  return (
    <CardWrapper>
      <>
        <AppText classNames="text-gray-500">{titleOne}</AppText>
        <AppText>{titleTwo}</AppText>
      </>
    </CardWrapper>
  );
};

const CardWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <View className="shadow-lg flex-row bg-white justify-between items-center p-6  rounded-xl mb-3 ">
      {children}
    </View>
  );
};
