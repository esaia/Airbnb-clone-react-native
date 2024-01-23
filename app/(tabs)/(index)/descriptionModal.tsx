import React from "react";
import AppText from "@/components/typography/AppText";
import { useSingleViewContext } from "./_layout";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from "react-native-reanimated";
import { View } from "react-native";

const descriptionModal = () => {
  const { description } = useSingleViewContext();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollOffset.value > 15 ? withTiming(1) : withTiming(0),
    };
  });

  return (
    <View className="flex-1 bg-white ">
      <Animated.View
        className="w-full bg-gray-200 h-[1px]"
        style={imageAnimatedStyle}
      />

      <Animated.ScrollView
        className="px-4  flex-1   "
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <AppText thick="bold" classNames="text-2xl  my-2 ">
          About this place
        </AppText>
        <AppText classNames="leading-6 ">{description}</AppText>
      </Animated.ScrollView>
    </View>
  );
};

export default descriptionModal;
