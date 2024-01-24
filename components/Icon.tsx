import { ReactElement } from "react";
import { Pressable } from "react-native";

const Icon = ({
  icon,
  onPress,
}: {
  icon: ReactElement;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      className=" rounded-full bg-white border-[0.4px] border-gray-400 shadow-lg aspect-square w-8 items-center justify-center "
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
};

export default Icon;
