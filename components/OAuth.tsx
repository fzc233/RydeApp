import React from "react";
import { Image, Text, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { handleGoogleSignIn, isProcessing } = useGoogleSignIn();

  return (
    <View className="flex-1 justify-center items-center p-5">
      {/* Divider */}
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      {/* Google Sign-In Button */}
      <CustomButton
        title={isProcessing ? "Signing in..." : "Log In with Google"}
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={() => handleGoogleSignIn(startOAuthFlow)}
        disabled={isProcessing} // 禁用按钮避免重复点击
      />
    </View>
  );
};

export default OAuth;
