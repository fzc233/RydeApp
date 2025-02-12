import { useStripe } from "@stripe/stripe-react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";
import {
  createPaymentIntent,
  processPayment,
  createRideBooking,
} from "@/service/paymentService";

const usePayment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userId } = useAuth();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();

  const [success, setSuccess] = useState<boolean>(false);

  // **检查位置数据是否为空**
  const validateLocationData = (): boolean => {
    if (userId === null) {
      Alert.alert("userID error", "Please enter right userid.");
      return false;
    }
    if (!userAddress || !destinationAddress) {
      Alert.alert(
        "Location Error",
        "Please enter both origin and destination addresses.",
      );
      return false;
    }

    if (
      userLongitude === null ||
      userLatitude === null ||
      destinationLatitude === null ||
      destinationLongitude === null
    ) {
      Alert.alert(
        "Location Error",
        "Invalid location data. Please ensure GPS is enabled.",
      );
      return false;
    }

    return true;
  };

  // **初始化支付**
  const initializePaymentSheet = async () => {
    if (!validateLocationData()) {
      return; // 如果检查不通过，直接 return，阻止支付流程
    }

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "usd",
        },
        confirmHandler: async (
          paymentMethod,
          shouldSavePaymentMethod,
          intentCreationCallback,
        ) => {
          try {
            // 1️⃣ 创建支付意图
            const { paymentIntent, customer } = await createPaymentIntent(
              fullName,
              email,
              amount,
              paymentMethod.id,
            );

            if (paymentIntent.client_secret) {
              // 2️⃣ 处理支付
              const { result } = await processPayment(
                paymentMethod.id,
                paymentIntent.id,
                customer,
                paymentIntent.client_secret,
              );

              if (result.client_secret) {
                // 3️⃣ 创建行程记录
                await createRideBooking(
                  userAddress!,
                  destinationAddress!,
                  userLatitude!,
                  userLongitude!,
                  destinationLatitude!,
                  destinationLongitude!,
                  rideTime,
                  amount,
                  driverId,
                  userId!,
                );

                intentCreationCallback({ clientSecret: result.client_secret });
              }
            }
          } catch (error) {
            console.error("Payment process failed:", error);
            Alert.alert(
              "Payment Failed",
              "Something went wrong. Please try again.",
            );
          }
        },
      },
      returnURL: "myapp://book-ride",
    });

    if (!error) {
      console.log("Payment sheet initialized successfully");
    }
  };

  // **打开支付面板**
  const openPaymentSheet = async () => {
    if (!validateLocationData()) {
      return; // 位置数据不完整，直接 return，阻止支付
    }

    await initializePaymentSheet();

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return { openPaymentSheet, success, setSuccess };
};

export default usePayment;
