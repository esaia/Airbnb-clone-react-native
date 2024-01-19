import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AppText from "@/components/typography/AppText";

enum Auth {
  oauth_google,
  oauth_facebook,
}
const Oauth = () => {
  const { startOAuthFlow: authGoogle } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: authFacebook } = useOAuth({
    strategy: "oauth_facebook",
  });

  const signInOauth = async (strategy: Auth) => {
    const selectedAuth = {
      [Auth.oauth_google]: authGoogle,
      [Auth.oauth_facebook]: authFacebook,
    }[strategy];

    try {
      const { createdSessionId, setActive, signUp } = await selectedAuth();

      if (setActive)
        if (createdSessionId) {
          setActive({ session: createdSessionId });
          router.back();

          console.log("sessionID__ ->> ", createdSessionId);
        } else {
          await signUp?.update({
            username: signUp.id,
          });
          if (signUp?.createdSessionId) {
            setActive({ session: signUp?.createdUserId });
            router.back();
            console.log("sessionID__ ->> ", signUp?.createdUserId);
          }
        }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View className="flex-col ">
      <SocialButtons
        text="Continue with Google"
        iconName="google"
        link={() => signInOauth(Auth.oauth_google)}
      />

      <SocialButtons
        text="Continue with Facebook"
        iconName="facebook-square"
        link={() => signInOauth(Auth.oauth_facebook)}
      />
    </View>
  );
};

export default Oauth;

const SocialButtons = ({
  text,
  iconName,
  link,
}: {
  text: string;
  iconName?: any;
  link?: () => void;
}) => {
  return (
    <TouchableOpacity
      className="  border-gray-500 border-2 rounded-md  p-3 relative  mt-4"
      onPress={link}
    >
      <View className="absolute left-4 top-[50%] translate-y-[-50%]">
        <AntDesign name={iconName || "infocirlce"} size={24} color="black" />
      </View>
      <AppText classNames="text-center" thick="bold">
        {text}
      </AppText>
    </TouchableOpacity>
  );
};
