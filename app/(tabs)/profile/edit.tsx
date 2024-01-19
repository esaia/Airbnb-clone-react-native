import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import Input from "@/components/typography/Input";
import PrimaryButton from "@/components/PrimaryButton";
import AppText from "@/components/typography/AppText";
import { useUser } from "@clerk/clerk-expo";

import * as ImagePicker from "expo-image-picker";

interface EditUser {
  firstName?: string;
  lastName?: string;
  username?: string;
}

const Page = () => {
  const { isSignedIn, user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Partial<ErrorsType>>({});

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      try {
        setLoading(true);
        await user?.setProfileImage({
          file: base64,
        });

        setLoading(false);

        Alert.alert("image uploaded successfully");
      } catch (error) {
        setLoading(false);

        Alert.alert("Image upload failed");
      }
    }
  };

  const editUser = async () => {
    if (!isSignedIn) return;
    setErrors({});

    try {
      const editObject: EditUser = {};

      if (firstName && firstName !== user?.firstName) {
        editObject.firstName = firstName;
      }

      if (lastName && lastName !== user?.lastName) {
        editObject.lastName = lastName;
      }

      if (username && username !== user?.username) {
        editObject.username = username;
      }

      if (Object.keys(editObject).length === 0) return;

      setLoading(true);
      await user?.update(editObject);

      setLoading(false);
      Alert.alert("username updated successfully");
    } catch (err: any) {
      console.log("edeitError ", err);

      setLoading(false);

      setErrors({
        ...errors,
        text:
          (err && err?.errors && err?.errors?.[0]?.message) ||
          "something went wrong",
      });
    }
  };

  if (!isSignedIn) {
    return (
      <View className="flex-1 justify-center items-center">
        <AppText classNames="text-xl">Please Log In / Sign Up first</AppText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 p-4 justify-center "
    >
      <AppText thick="bold" classNames="text-center text-2xl pb-10 ">
        Edit User
      </AppText>

      <View className="flex-row gap-5 ">
        <View className="flex-1 ">
          <Input
            value={firstName}
            setValue={setFirstName}
            name="firstname"
            placeHolder="Edit FirstName"
          />
        </View>
        <View className="flex-1">
          <Input
            value={lastName}
            setValue={setLastName}
            name="firstname"
            placeHolder="Edit LastName"
          />
        </View>
      </View>

      <Input
        value={username}
        setValue={setUsername}
        name="username"
        placeHolder="Edit Username"
      />

      <TouchableOpacity
        className="flex-row items-center gap-5"
        onPress={pickImage}
      >
        <Image
          source={{ uri: user.imageUrl }}
          width={60}
          height={60}
          className="rounded-full "
        />
        <AppText>Choose Photo</AppText>
      </TouchableOpacity>

      <View className="h-12">
        {errors.text && (
          <AppText classNames="text-red-500 py-1">
            {errors?.text} fanssfnjfsnj
          </AppText>
        )}
      </View>

      <TouchableOpacity disabled={loading} onPress={editUser}>
        <PrimaryButton isDisabled={loading}>
          {loading ? "loading..." : "Edit User"}
        </PrimaryButton>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Page;
