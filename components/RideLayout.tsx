import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
export default RideLayout;
