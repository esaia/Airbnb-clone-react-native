import {
  View,
  Text,
  Button,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import AppText from "@/components/typography/AppText";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const Page = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();

  const router = useRouter();

  const deleteUserPress = () => {
    Alert.alert(
      "Are you sure you want to delete Account?",
      "If you delete your account, it will be permanently deleted from the database!!!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: async () => {
            await user?.delete();
            router.replace("/(tabs)/");
          },
        },
      ]
    );
  };
  if (!isSignedIn) {
    return (
      <View className="  h-full justify-center  p-5">
        <AppText classNames="text-center text-xl mb-5 ">
          You are not signed in
        </AppText>
        <TouchableOpacity
          className="rounded-md bg-white "
          onPress={() => {
            router.push("/(modals)/loginModal");
          }}
        >
          <AppText classNames="text-primary uppercase p-5 text-center font-bold ">
            Log in
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <View className="justify-evenly h-full px-4 py-5">
        <View className="bg-white p-3  rounded-md  ">
          <View className="justify-center items-center mb-8">
            <Image
              source={{ uri: user.imageUrl }}
              width={60}
              height={60}
              className="rounded-full "
            />
          </View>

          <View>
            <UserInfo
              title="email"
              value={user?.emailAddresses[0].emailAddress}
            />

            <UserInfo title="fullName" value={user?.fullName} />
            <UserInfo title="Username" value={user?.username} />

            {/* <AppText>fullName: {user?.fullName}</AppText> */}
          </View>
        </View>

        <View className="space-y-10">
          <View className="flex-row justify-between  ">
            <TouchableOpacity
              onPress={deleteUserPress}
              className="rounded-md bg-white "
            >
              <AppText classNames="text-primary uppercase p-5 text-center font-bold">
                Delete Account
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                router.push("/profile/edit");
                // await user?.delete();
                // router.replace("/(tabs)/");
              }}
              className="rounded-md bg-white "
            >
              <AppText classNames="text-blue-950 uppercase p-5 text-center font-bold">
                Edit Account
              </AppText>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="rounded-md bg-white  "
            onPress={() => {
              signOut();
              router.replace("/(tabs)");
            }}
          >
            <AppText classNames="text-primary uppercase p-5 text-center font-bold">
              Logout
            </AppText>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Button title="click me" onPress={() => console.log(user)} /> */}
    </View>
  );
};

export default Page;

const UserInfo = ({ title, value }: { [key: string]: string | null }) => {
  return (
    <View className=" flex-row px-2 py-3 w-full justify-start ">
      <AppText classNames="mr-3 w-20 ">{title}:</AppText>
      <AppText thick="bold" classNames="flex-1">
        {value}
      </AppText>
    </View>
  );
};
