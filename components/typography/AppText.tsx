import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AppText = ({
  children,
  classNames = "",
  thick = "regular",
  customStyles,
  ...attrs
}: {
  children: React.ReactNode;
  classNames?: string;
  thick?: "bold" | "light" | "regular";
  numberOfLines?: number;
  customStyles?: object;
}) => {
  return (
    <Text
      style={[styles[thick], customStyles]}
      className={classNames}
      {...attrs}
    >
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  regular: {
    fontFamily: "MontserratRegular",
  },
  bold: {
    fontFamily: "MontserratBold",
  },
  light: {
    fontFamily: "MontserratLight",
  },
});
