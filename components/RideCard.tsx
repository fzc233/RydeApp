import { Ride } from "@/types/type";
import { View, Text, Image } from "react-native";

const RideCard = ({
  ride: {
    destination_longitude,
    destination_address,
    destination_latitude,
    origin_address,
    created_at,
    ride_time,
    driver,
    payment_status,
  },
}: {
  ride: Ride;
}) => (
  <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
    <View className="flex flex-row items-center justify-between p-3">
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLI_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-lg"
        />
      </View>
    </View>
    <Text className="text-2xl ">{driver.first_name}</Text>
  </View>
);
export default RideCard;
