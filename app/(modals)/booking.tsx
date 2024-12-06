import { View, TextInput, Image, Pressable, ScrollView } from "react-native";
import React, { ReactElement, useMemo, useState } from "react";
import { BlurView } from "expo-blur";
import AppText from "@/components/typography/AppText";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";

interface GuestsType {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

const booking = () => {
  const [destination, setDestination] = useState("");
  const [activeCard, setActiveCard] = useState(0);
  const [guests, setGuests] = useState<GuestsType>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

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
    <>
      <BlurView intensity={80} tint="light" className="flex-1  pt-28 relative">
        <View className="p-5 flex-col">
          {activeCard === 0 && (
            <CardWrapper>
              <View className="flex-1 space-y-4 flex-col ">
                <AppText thick="bold" classNames="text-2xl">
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

                <Animated.ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="flex-row  space-x-3  w-[calc(100%+24px)]   mx-[-24px] px-6"
                  snapToInterval={140}
                  snapToAlignment={"start"}
                >
                  {worldCrouselData.map((item) => {
                    return (
                      <View key={item.title} className=" w-32 max-w-32">
                        <Image
                          source={item.imgage_url}
                          style={{ borderColor: "#D1D5DB" }}
                          className="w-full h-32 rounded-lg mb-2 border"
                        />
                        <AppText>{item.title}</AppText>
                      </View>
                    );
                  })}
                  <View className="mr-9" />
                </Animated.ScrollView>
              </View>
            </CardWrapper>
          )}

          {activeCard !== 0 && (
            <Pressable
              className=" flex-row justify-between"
              onPress={() => setActiveCard(0)}
            >
              <CardWrapper>
                <>
                  <AppText classNames="text-gray-500">Where</AppText>
                  <AppText thick="bold">I'm flexible</AppText>
                </>
              </CardWrapper>
            </Pressable>
          )}

          {activeCard === 1 && (
            <CardWrapper>
              <Pressable onPress={() => setActiveCard(0)}>
                <AppText thick="bold" classNames="text-2xl">
                  When's your trip?
                </AppText>
              </Pressable>
            </CardWrapper>
          )}

          {activeCard !== 1 && (
            <Pressable
              className="w-full flex-row justify-between"
              onPress={() => setActiveCard(1)}
            >
              <CardWrapper>
                <>
                  <AppText classNames="text-gray-500">When</AppText>
                  <AppText thick="bold">Any week</AppText>
                </>
              </CardWrapper>
            </Pressable>
          )}

          {activeCard === 2 && (
            <CardWrapper>
              <View className="w-full ">
                <AppText thick="bold" classNames="text-2xl">
                  Who's coming?
                </AppText>

                <ScrollView>
                  <GuestsConditions
                    title="Adults"
                    subTitle="Age 13 or above"
                    guests={guests}
                    setGuests={setGuests}
                    guestkey="adults"
                  />

                  <GuestsConditions
                    title="Children"
                    subTitle="Ages 2-12"
                    guests={guests}
                    setGuests={setGuests}
                    guestkey="children"
                  />

                  <GuestsConditions
                    title="Infants"
                    subTitle="under 2"
                    guests={guests}
                    setGuests={setGuests}
                    guestkey="infants"
                  />

                  <GuestsConditions
                    title="Pets"
                    subTitle="Bringins a Service animal?"
                    guests={guests}
                    setGuests={setGuests}
                    guestkey="pets"
                    isLast={true}
                  />
                </ScrollView>
              </View>
            </CardWrapper>
          )}

          {activeCard !== 2 && (
            <Pressable
              className="w-full flex-row justify-between"
              onPress={() => setActiveCard(2)}
            >
              <CardWrapper>
                <>
                  <AppText classNames="text-gray-500">Who</AppText>
                  <AppText thick="bold">Add guests</AppText>
                </>
              </CardWrapper>
            </Pressable>
          )}
        </View>

        <Animated.View
          entering={FadeInDown.duration(200).delay(200)}
          className="pt-5 pb-10 px-5  bg-white border-t-[1px] border-t-gray-300 flex-row  items-center justify-between  w-full absolute bottom-0 "
        >
          <AppText classNames="underline" thick="bold">
            Clear all
          </AppText>
          <TouchableOpacity className="px-5 py-3 bg-primary rounded-lg flex-row items-center space-x-2 ">
            <Ionicons name="search" color={"white"} size={20} />
            <AppText classNames="text-white text-lg" thick="bold">
              Search
            </AppText>
          </TouchableOpacity>
        </Animated.View>
      </BlurView>
    </>
  );
};

export default booking;

const GuestsConditions = ({
  title,
  subTitle,
  guests,
  setGuests,
  guestkey,
  isLast = false,
}: {
  title: string;
  subTitle: string;
  guests: GuestsType;
  setGuests: React.Dispatch<React.SetStateAction<GuestsType>>;
  guestkey: keyof GuestsType;
  isLast?: boolean;
}) => {
  const isZero = guests[guestkey] === 0;

  const iconStyle = useMemo(
    () => "w-8 h-8 rounded-full  justify-center items-center",
    []
  );
  const lightGray = useMemo(() => "#d4d4d4", []);
  const gray = useMemo(() => "#969696", []);

  const onMinus = () => {
    if (isZero) return;
    setGuests({ ...guests, [guestkey]: guests[guestkey] - 1 });
  };

  return (
    <View
      className={`flex-row border-b border-b-gray-300 justify-between py-5  ${
        isLast && "border-b-0"
      }`}
    >
      <View>
        <AppText classNames="text-lg">{title}</AppText>
        <AppText classNames="text-gray-500 text-xs">{subTitle}</AppText>
      </View>

      <View className="flex-row items-center space-x-2">
        <Pressable
          className={iconStyle}
          onPress={onMinus}
          style={{
            borderColor: isZero ? lightGray : gray,
            borderWidth: 1,
          }}
        >
          <Entypo name="minus" size={20} color={isZero ? lightGray : gray} />
        </Pressable>
        <AppText thick="bold" classNames="w-4 text-lg text-center">
          {guests[guestkey]}
        </AppText>
        <Pressable
          onPress={() =>
            setGuests({ ...guests, [guestkey]: guests[guestkey] + 1 })
          }
          className={iconStyle}
          style={{ borderColor: gray, borderWidth: 1 }}
        >
          <AntDesign name="plus" size={20} color={gray} />
        </Pressable>
      </View>
    </View>
  );
};

const CardWrapper = ({ children }: { children: ReactElement }) => {
  return (
    <Animated.View
      entering={FadeIn.duration(500)}
      exiting={FadeOut.duration(300)}
      className="w-full"
    >
      <View className="shadow-lg flex-row bg-white justify-between items-center p-6  rounded-xl mb-3 ">
        {children}
      </View>
    </Animated.View>
  );
};
