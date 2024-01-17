import { View, Text, TextInput } from "react-native";
import React from "react";
import AppText from "./AppText";

interface PropsType {
  placeHolder: string;
  value: string;
  setValue: (value: string) => void;
  errors: Partial<ErrorsType>;
  name: string;
  isPassword?: boolean;
}

const Input = ({
  placeHolder,
  value,
  setValue,
  errors,
  name,
  isPassword = false,
}: PropsType) => {
  return (
    <View>
      <TextInput
        onChangeText={(value) => setValue(value)}
        value={value}
        placeholder={placeHolder}
        secureTextEntry={isPassword}
        className="px-2 py-4 border border-gray-200 rounded-md mt-2 "
        placeholderTextColor={"gray"}
      />
      {errors[name] && (
        <AppText classNames="text-red-500 py-1">{errors[name]}</AppText>
      )}
    </View>
  );
};

export default Input;
