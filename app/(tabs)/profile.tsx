import { View, Text, Button, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import AppText from "@/components/typography/AppText";
import { useRouter } from "expo-router";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  return (
    <View>
      {isSignedIn && (
        <View>
          <AppText> {user?.emailAddresses[0].emailAddress}</AppText>
          {user.hasImage && (
            <Image source={{ uri: user.imageUrl }} width={60} height={60} />
          )}
        </View>
      )}

      <Button title="click me" onPress={() => console.log(user)} />
      <Button
        title="delete user"
        onPress={async () => {
          await user?.delete();
          router.replace("/(tabs)/");
        }}
      />
    </View>
  );
};

export default Page;
