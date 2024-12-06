import {
  Image,
  Modal,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import airbnb from "@/assets/data/airbnb-list.json";
import { AirbnbList } from "@/types/types";
import AppText from "@/components/typography/AppText";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { useSingleViewContext } from "@/contexts/SingleViewContextProvider";

const IMAGE_HEIGHT = 300;

const page = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { setDescription } = useSingleViewContext();

  const [singeleList, setSingeleList] = useState<AirbnbList>();
  useEffect(() => {
    const findList = (airbnb as AirbnbList[]).find((item) => item.id === id);
    setSingeleList(findList);
  });

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT * 0.5]
          ),
        },

        {
          scale: interpolate(
            scrollOffset.value,
            [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
            [2, 1, 1.3]
          ),
        },
      ],
    };
  });

  const headerBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [IMAGE_HEIGHT / 2, IMAGE_HEIGHT * 0.7],
        [0, 1]
      ),
    };
  });

  useEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerBackground: () => (
          <Animated.View
            className="w-full h-full bg-white border-b-[1px] border-b-gray-200"
            style={headerBackgroundStyle}
          />
        ),
      });
    }, 500);
  }, []);

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        className=" z-4  bg-white "
        contentContainerStyle={{ paddingBottom: 110 }}
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Animated.Image
          //   sharedTransitionTag={`image-${id}`}
          source={{ uri: singeleList?.medium_url }}
          className="w-full "
          style={[{ height: IMAGE_HEIGHT }, imageAnimatedStyle]}
        />

        <Animated.View
          className="px-5 space-y-5 z-5 bg-white pt-5"
          entering={FadeIn.duration(500).delay(100)}
        >
          <View>
            <AppText classNames="text-2xl " thick="bold">
              {singeleList?.name}
            </AppText>

            <AppText thick="bold" numberOfLines={2}>
              {singeleList?.room_type} in {singeleList?.smart_location}
            </AppText>
          </View>

          <View className="flex-row">
            <AppText classNames="text-sm mr-1">
              {singeleList?.guests_included} Guests •
            </AppText>

            <AppText classNames="text-sm mr-1">
              {singeleList?.bedrooms} bedroom •
            </AppText>
            <AppText classNames="text-sm mr-1">
              {singeleList?.beds} beds •
            </AppText>
            <AppText classNames="text-sm mr-1">
              {singeleList?.bathrooms} bathrooms
            </AppText>
          </View>

          {singeleList?.id && +singeleList?.id % 2 === 0 && (
            <View className="flex-row items-center justify-between border border-gray-300 px-2 py-4   rounded-lg">
              {singeleList?.review_scores_accuracy ? (
                <View className="flex-1 items-center border-r-[1px] border-r-gray-300 ">
                  <AppText classNames="text-lg" thick="bold">
                    {singeleList?.review_scores_accuracy / 2}
                  </AppText>

                  <View className="flex-row space-x-[1px]">
                    {Array.from(
                      {
                        length: Math.ceil(
                          singeleList?.review_scores_accuracy / 2
                        ),
                      },
                      (_, index) => (
                        <Ionicons key={index} size={10} name="star-sharp" />
                      )
                    )}
                  </View>
                </View>
              ) : (
                <View className="w-[90px] items-center border-r-[1px] border-r-gray-300 ">
                  <AppText classNames="w-20 text-center  ">
                    Review is not available
                  </AppText>
                </View>
              )}

              <View className="flex-[2_2_0%] justify-center items-center flex-row ">
                <View className="-rotate-45">
                  <Entypo name="feather" size={24} color="black" />
                </View>
                <AppText classNames="w-[70px] text-center" thick="bold">
                  Guests favourite
                </AppText>
                <View className=" scale-x-[-1]  -rotate-45 ">
                  <Entypo name="feather" size={24} color="black" />
                </View>
              </View>

              <View className="flex-1 items-center justify-center border-l-[1px] border-l-gray-300 ">
                <AppText classNames="text-lg" thick="bold">
                  {singeleList?.number_of_reviews}
                </AppText>
                <AppText thick="bold" classNames="underline">
                  Reviews
                </AppText>
              </View>
            </View>
          )}

          <View className="border-y py-2 border-y-gray-300 flex-row items-center space-x-3">
            <Image
              source={{ uri: singeleList?.host_picture_url }}
              className="w-10 h-10 aspect-square rounded-full"
            />

            <View>
              <AppText thick="bold" classNames="text-lg">
                Hosted by {singeleList?.host_name}
              </AppText>
              <AppText classNames="text-gray-500" thick="light">
                Host since {singeleList?.host_since}
              </AppText>
            </View>
          </View>

          <View>
            <AppText numberOfLines={6} classNames="leading-6 mb-2">
              {singeleList?.description}
            </AppText>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                setDescription(singeleList?.description || "");
                router.push("/listing/descriptionModal");
              }}
            >
              <AppText thick="bold" classNames="underline ">
                Show more
              </AppText>
              <Entypo name="chevron-right" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.ScrollView>

      <Animated.View
        className="py-6 px-5 bg-white border-t-[1px] border-t-gray-200 flex-row justify-between items-center absolute bottom-0 w-full  "
        entering={FadeInDown.duration(200).delay(300)}
        exiting={FadeOutDown}
      >
        <View className="flex-row items-center space-x-2">
          <AppText thick="bold" classNames="text-lg">
            $ 204
          </AppText>
          <AppText classNames="" thick="light">
            night
          </AppText>
        </View>
        <TouchableOpacity className="px-10 py-4 bg-primary rounded-lg ">
          <AppText classNames="text-white " thick="bold">
            reserve
          </AppText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default page;
