import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AppText = ({
  children,
  classNames = "",
  thick = "regular",
  ...attrs
}: {
  children: React.ReactNode;
  classNames?: string;
  thick?: "bold" | "light" | "regular";
  [key: string]: any;
}) => {
  return (
    <Text style={styles[thick]} className={classNames} {...attrs}>
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
