import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import type { AirbnbList } from "@/types/types";
import airbnb from "@/assets/data/airbnb-list.json";
import AppText from "@/components/typography/AppText";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className=" bg-white">
      <FlatList
        data={airbnb?.results as [AirbnbList]}
        renderItem={Card}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

const Card = ({ item }: { item: AirbnbList }) => {
  return (
    <TouchableOpacity activeOpacity={1} className="py-3 px-5 ">
      <View className="relative rounded-md overflow-hidden">
        <Image
          source={{ uri: item.picture_url.url }}
          className="w-full h-60 "
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.733)", "transparent"]}
          end={{ x: 0, y: 0 }}
          start={{ x: 0, y: 1 }}
          className="absolute left-0 right-0 h-full "
        />

        <View className="absolute top-3 right-3 text-white">
          <AntDesign name="hearto" size={24} color="white" />
        </View>

        {item.review_scores_accuracy && (
          <View className="absolute top-3 left-3 flex-row items-center space-x-1">
            <AppText classNames="text-white text-lg" thick="bold">
              {item.review_scores_accuracy}
            </AppText>

            <Entypo name="star" size={24} color="white" />
          </View>
        )}

        <View className="absolute bottom-0 left-0 w-full p-5 flex-row justify-between space-x-5">
          <View className="flex-1 space-y-2">
            <AppText thick="bold" classNames="text-white" numberOfLines={2}>
              {item.name} Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Molestias, nemo.
            </AppText>

            <AppText classNames="text-gray-200" thick="light">
              {item.room_type}
            </AppText>
          </View>

          <View className=" flex-row items-center ">
            <AppText classNames="text-white mr-2 text-lg " thick="bold">
              {item.price}
            </AppText>
            <FontAwesome name="dollar" size={15} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
