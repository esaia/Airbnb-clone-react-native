import { View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "@/components/typography/AppText";
import { useWarmUpBrowser } from "@/hooks/warmUpBrowser";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import SignUp from "@/components/Auth/SignUp";
import Login from "@/components/Auth/LogIn";

import { TabView, SceneMap } from "react-native-tab-view";
import Oauth from "@/components/Auth/Oauth";

const FirstRoute = () => <Login />;

const SecondRoute = () => <SignUp />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const login = () => {
  useWarmUpBrowser();

  const { isLoaded, isSignedIn } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/(tabs)/(index)");
    }
  }, [isSignedIn]);

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Log In" },
    { key: "second", title: "Sign Up" },
  ]);

  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row justify-evenly">
        {props.navigationState.routes.map(
          (route: { title: string }, i: number) => {
            return (
              <TouchableOpacity onPress={() => setIndex(i)} key={i}>
                <AppText
                  classNames={`${i === index && "text-primary font-bold"}`}
                >
                  {route.title}
                </AppText>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="p-4 flex-col flex-1  bg-white  outline-none "
    >
      <View className=" h-4/6">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          className="  block h-20 "
          renderTabBar={renderTabBar}
        />
      </View>

      <View className="gap-y-3">
        <View className="flex-row items-center gap-2  ">
          <View className="flex-1 border-b border-b-gray-400" />
          <AppText>or</AppText>
          <View className="flex-1 border-b border-b-gray-400" />
        </View>
      </View>

      <Oauth />
    </KeyboardAvoidingView>
  );
};

export default login;
