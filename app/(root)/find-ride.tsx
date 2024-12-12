import { View, Text } from "react-native";
import { useLocationStore } from "@/store";

const findRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useLocationStore();
  return (
    <View>
      <Text className="text-2xl">You are here: {userAddress}</Text>
      <Text className="text-2xl">You are going to: {destinationAddress} </Text>
    </View>
  );
};
export default findRide;
