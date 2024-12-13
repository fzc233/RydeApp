import { View, Text } from "react-native";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";

const findRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useLocationStore();
  return (
    <RideLayout>
      <Text className="text-2xl">Find Ride</Text>
    </RideLayout>
  );
};
export default findRide;
