import { View, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import Button from "@/components/PrimaryButton";
import Input from "@/components/typography/Input";
import { router } from "expo-router";
import AppText from "../typography/AppText";
import { ErrorsType } from "@/types/types";

const LogIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Partial<ErrorsType>>({});
  const [clicked, setClicked] = useState(false);

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errorsTemp: Partial<ErrorsType> = {};

    if (!emailAddress) {
      errorsTemp.emailAddress = "Email or Username is required.";
    }

    if (!password) {
      errorsTemp.password = "Password is required.";
    } else if (password.length < 6) {
      errorsTemp.password = "Password must be at least 6 characters.";
    }

    // setErrors((err) => ({ ...err, ...errorsTemp }));
    setErrors(errorsTemp);

    return errorsTemp;
  };

  useEffect(() => {
    if (clicked) validate();
  }, [emailAddress, password, clicked]);

  const emailSignIn = async () => {
    setClicked(true);
    const errorsValidate = validate();

    if (Object.keys(errorsValidate).length > 0) return;

    if (!isLoaded) {
      return;
    }

    setLoading(true);

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
      router.push("/(tabs)");
    } catch (error: any) {
      console.log("errrrorrr ->>>> ", error, error?.errors?.[0]?.message);

      setErrors({
        ...error,
        text:
          (error && error?.errors && error?.errors?.[0]?.message) ||
          "something went wrong",
      });
    }

    setLoading(false);
  };

  return (
    <ScrollView className="p-5 ">
      <View className=" flex-col p  ">
        <Input
          placeHolder="email or username"
          setValue={setEmailAddress}
          value={emailAddress}
          name="emailAddress"
          errors={errors}
        />

        <Input
          placeHolder="password"
          setValue={setPassword}
          value={password}
          name="password"
          isPassword={true}
          errors={errors}
        />

        <View className="h-12">
          {errors?.text && (
            <AppText classNames="text-red-500 ">{errors?.text}</AppText>
          )}
        </View>

        <TouchableOpacity disabled={loading} onPress={emailSignIn}>
          <Button isDisabled={loading}>
            {loading ? "loading..." : "Sign in"}
          </Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LogIn;
