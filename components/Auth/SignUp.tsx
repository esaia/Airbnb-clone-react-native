import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import Button from "@/components/PrimaryButton";
import Input from "@/components/typography/Input";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../typography/AppText";
import { ErrorsType } from "@/types/types";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState<Partial<ErrorsType>>({ test: "test" });
  const [clicked, setClicked] = useState(false);

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errorsTemp: Partial<ErrorsType> = {};

    if (!firstName) {
      errorsTemp.firstName = "firstName is required";
    }

    if (!lastName) {
      errorsTemp.lastName = "lastName is required";
    }

    if (!username) {
      errorsTemp.username = "username is required";
    }

    if (!emailAddress) {
      errorsTemp.emailAddress = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      errorsTemp.emailAddress = "Email is invalid.";
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
  }, [firstName, lastName, emailAddress, username, password, clicked]);

  const emailSignUp = async () => {
    setClicked(true);

    const errorsValidate = validate();

    if (Object.keys(errorsValidate).length > 0) return;

    if (!isLoaded) {
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (error: any) {
      setErrors({
        ...error,
        text:
          (error && error?.errors && error?.errors?.[0]?.message) ||
          "something went wrong",
      });
    }

    setLoading(false);
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      router.back();
    } catch (err: any) {}
  };

  return (
    <ScrollView className="p-5 " contentContainerStyle={{ paddingBottom: 60 }}>
      {!pendingVerification ? (
        <View className=" flex-col block   ">
          <View className="flex-row justify-between gap-3 ">
            <View className="flex-1">
              <Input
                placeHolder="firstname"
                setValue={setFirstName}
                value={firstName}
                name="firstName"
                errors={errors}
              />
            </View>

            <View className="w-full flex-1">
              <Input
                placeHolder="lastname"
                setValue={setLastName}
                value={lastName}
                name="lastName"
                errors={errors}
              />
            </View>
          </View>

          <Input
            placeHolder="username"
            setValue={setUsername}
            value={username}
            name="username"
            errors={errors}
          />

          <Input
            placeHolder="email"
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
            {errors.text && (
              <AppText classNames="text-red-500 py-1">
                {errors?.text} fanssfnjfsnj
              </AppText>
            )}
          </View>
          <TouchableOpacity disabled={loading} onPress={emailSignUp}>
            <Button isDisabled={loading}>
              {loading ? "loading..." : "Sign Up"}
            </Button>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            className="py-2"
            onPress={() => setPendingVerification(false)}
          >
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
          <View className="flex-row flex-wrap gap-y-1 ">
            <AppText>
              an email with a verification code was just sent to:
            </AppText>
            <AppText thick="bold" classNames="font-bold">
              {emailAddress}
            </AppText>
          </View>

          <View>
            <Input
              placeHolder="code"
              setValue={setCode}
              value={code}
              name="code"
              errors={errors}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} className="mt-3">
            <Button>verify email</Button>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default SignUp;
