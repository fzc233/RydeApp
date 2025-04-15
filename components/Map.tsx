import React, { useMemo } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { icons } from "@/constants";
import { useDriverData } from "@/hooks/useDriverData";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

type MapProps = {
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  selectedDriver: number;
};

const Map = ({
  destinationLatitude,
  destinationLongitude,
  selectedDriver,
}: MapProps) => {
  const { markers, region, loading, error } = useDriverData(
    destinationLatitude,
    destinationLongitude,
  );

  // 使用 useMemo 来优化标记的计算，避免重复渲染
  const memoizedMarkers = useMemo(() => markers, [markers]);
  const memoizedRegion = useMemo(() => region, [region]);

  // 渲染加载状态
  if (loading) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
        <Text>Loading map...</Text> {/* 可以加更多用户提示 */}
      </View>
    );
  }

  // 错误处理
  if (error) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : "An unexpected error occurred";
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {errorMessage}</Text>
      </View>
    );
  }

  // 渲染地图组件
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={memoizedRegion}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {memoizedMarkers.map((marker) => (
        <Marker
          key={marker.id} // 直接使用唯一的 id
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude !== null &&
        destinationLongitude !== null &&
        !isNaN(destinationLatitude) &&
        !isNaN(destinationLongitude) && (
          <>
            <Marker
              key="destination"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              image={icons.pin}
            />
            <MapViewDirections
              origin={{
                latitude: memoizedRegion.latitude,
                longitude: memoizedRegion.longitude,
              }}
              destination={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              apikey={directionsAPI!}
              strokeColor="#0286FF"
              strokeWidth={2}
            />
          </>
        )}
    </MapView>
  );
};

export default Map;
