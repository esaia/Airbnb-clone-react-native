import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AppText from "@/components/typography/AppText";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Stack, router } from "expo-router";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";

import airbnb from "@/assets/data/airbnb-list.json";
import type { AirbnbList } from "@/types/types";

import { SharedElement } from "react-native-shared-element";
import MainHeader from "@/components/MainHeader";
import MapView from "react-native-maps";
import Map from "@/components/Map";

import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

const Home = () => {
  const categoryChanged = (categoryName: string) => {
    // setCategory(categoryName);
    // setListData(filterData);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const listRef = useRef<BottomSheetFlatListMethods>();

  const snapPoints = useMemo(() => ["10%", "100%"], []);

  const onClickMap = () => {
    if (!bottomSheetRef.current && !listRef.current) return;

    console.log("render");
    bottomSheetRef.current?.snapToIndex(0);
    listRef.current?.scrollToIndex({ index: 0 });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className=" bg-white -mt-16">
      <Stack.Screen
        options={{
          header: () => <MainHeader categoryChanged={categoryChanged} />,
        }}
      />
      <Map />

      <BottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
        <View className="h-full w-full ">
          <BottomSheetFlatList
            ref={listRef as any}
            data={airbnb as AirbnbList[]}
            renderItem={Card}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <AppText classNames="text-center py-3">
                  {(airbnb as AirbnbList[]).length + 1} Places
                </AppText>
              );
            }}
          />

          <Pressable
            className="absolute bg-black rounded-full  px-5 py-2 bottom-4 w-30  left-[50%] translate-x-[-60px] flex-row items-center justify-center space-x-2  "
            onPress={onClickMap}
          >
            <AppText classNames="text-white text-xs" thick="bold">
              Map
            </AppText>
            <Ionicons name="map-outline" color={"white"} size={18} />
          </Pressable>
        </View>
      </BottomSheet>

      {/* 
      <FlatList
        data={airbnb as AirbnbList[]}
        renderItem={Card}
        showsVerticalScrollIndicator={false}
      /> */}
    </SafeAreaView>
  );
};

export default Home;

const Card = ({ item }: { item: AirbnbList }) => {
  return (
    <TouchableOpacity activeOpacity={1} className="py-3 px-5 ">
      <Animated.View
        entering={FadeInLeft.duration(500).delay(200)}
        // exiting={FadeInRight.duration(500)}
      >
        <View className="relative rounded-md overflow-hidden">
          <Image source={{ uri: item.medium_url }} className="w-full h-60 " />

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
      </Animated.View>
    </TouchableOpacity>
  );
};
