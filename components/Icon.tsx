import { ReactElement } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

const Icon = ({
  icon,
  onPress,
}: {
  icon: ReactElement;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      className=" rounded-full bg-white border-[0.4px] border-gray-400 shadow-lg aspect-square w-8 items-center justify-center "
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

export default Icon;
