import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";
import Button from "@/components/PrimaryButton";
import Input from "@/components/typography/Input";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./typography/AppText";

const EmailAuth = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const [errors, setErrors] = useState<Partial<ErrorsType>>({});
  const [clicked, setClicked] = useState(false);

  const validate = () => {
    const errors: Partial<ErrorsType> = {};

    if (!firstName) {
      errors.firstName = "firstName is required";
    }

    if (!lastName) {
      errors.lastName = "lastName is required";
    }

    if (!emailAddress) {
      errors.emailAddress = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      errors.emailAddress = "Email is invalid.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
  };

  useEffect(() => {
    if (clicked) validate();
  }, [firstName, lastName, emailAddress, password]);

  const emailSignUp = async () => {
    setClicked(true);
    validate();
    console.log("oldenter");
    if (Object.keys(errors).length > 0) return;

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp?.update({
        username: signUp.id,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      setErrors({ ...errors, text: "something went wrong" });
      console.error(JSON.stringify(err, null, 2));
    }
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
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <KeyboardAvoidingView>
      {!pendingVerification ? (
        <View className=" flex-col  ">
          <Input
            placeHolder="firstname"
            setValue={setFirstName}
            value={firstName}
            name="firstName"
            errors={errors}
          />
          <Input
            placeHolder="lastname"
            setValue={setLastName}
            value={lastName}
            name="lastName"
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

          {errors.text && (
            <AppText classNames="text-red-500 py-1">{errors?.text}</AppText>
          )}
          <TouchableOpacity onPress={emailSignUp} className="mt-2">
            <Button>Continue</Button>
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
    </KeyboardAvoidingView>
  );
};

export default EmailAuth;
