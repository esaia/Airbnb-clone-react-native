import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import MainHeader from "@/components/MainHeader";
import { SignedOut, useAuth } from "@clerk/clerk-expo";

const Home = () => {
  const { isLoaded, signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 80 }}>
      {/* <Stack.Screen
        options={{
          header: () => <MainHeader />,
        }}
      /> */}

      <Link href={"/(modals)/login"}>click this link</Link>

      <Text onPress={() => signOut()}>LOGOUT</Text>

      <Text>123123</Text>

      <SignedOut>
        <Text>You are Signed out</Text>
      </SignedOut>

      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
    </SafeAreaView>
  );
};

export default Home;
