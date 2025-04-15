import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { googleOAuth } from "@/lib/auth";

export const useGoogleSignIn = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleGoogleSignIn = async (startOAuthFlow: Function) => {
        if (isProcessing) return; // 防止重复点击
        setIsProcessing(true);

        console.log("Starting Google OAuth...");

        try {
            const result = await googleOAuth(startOAuthFlow);
            console.log("Google OAuth Result:", result); // 🔥 重要：检查返回值

            if (result.success) {
                Alert.alert("Success", "Redirecting to home screen.");
                setTimeout(() => {
                    console.log("Navigating to Home...");
                    router.replace("/(root)/(tabs)/home");
                }, 1000);
            } else {
                Alert.alert("Error", result.message || "Unknown error occurred.");
            }
        } catch (error) {
            console.error("Google OAuth Error:", error);
            Alert.alert("Error", "An error occurred during the OAuth process.");
        } finally {
            setIsProcessing(false);
        }
    };

    return { handleGoogleSignIn, isProcessing };
};
