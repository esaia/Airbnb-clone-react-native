import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";

import React, { useCallback, useEffect, useState } from "react";
import AppText from "@/components/typography/AppText";
import { AntDesign } from "@expo/vector-icons";
import { useWarmUpBrowser } from "@/hooks/warmUpBrowser";
import { SignedOut, useAuth, useOAuth, useSignUp } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import EmailAuth from "@/components/EmailAuth";

WebBrowser.maybeCompleteAuthSession();

const login = () => {
  useWarmUpBrowser();

  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();

  // useEffect(() => {
  //   if (isSignedIn) {
  //     router.push("/(tabs)/");
  //   }
  // }, [isSignedIn]);

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startOAuthFlow();

      if (setActive)
        if (createdSessionId) {
          setActive({ session: createdSessionId });
          router.back();

          console.log("sessionID__ ->> ", createdSessionId);
        } else {
          await signUp?.update({
            username: signUp.id,
          });
          if (signUp?.createdSessionId) {
            setActive({ session: signUp?.createdUserId });
            router.back();
            console.log("sessionID__ ->> ", signUp?.createdUserId);
          }
        }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View className="p-4 flex-col flex-1  gap-y-10 bg-white outline-none">
      <View className="">
        <EmailAuth />
      </View>
      <View className="flex-row items-center gap-2">
        <View className="flex-1 border-b border-b-gray-400" />
        <AppText>or</AppText>
        <View className="flex-1 border-b border-b-gray-400" />
      </View>

      <View className="flex-col gap-y-6">
        <TouchableOpacity
          className="  border-gray-500 border-2 rounded-md  p-3 relative "
          onPress={onPress}
        >
          <View className="absolute left-4 top-[50%] translate-y-[-50%]">
            <AntDesign name="google" size={24} color="black" />
          </View>
          <AppText classNames="text-center" thick="bold">
            Continue with Google
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity className="  border-gray-500 border-2 rounded-md  p-3 relative ">
          <View className="absolute left-4 top-[50%] translate-y-[-50%]">
            <AntDesign name="facebook-square" size={24} color="black" />
          </View>
          <AppText classNames="text-center" thick="bold">
            Continue with Facebook
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default login;
