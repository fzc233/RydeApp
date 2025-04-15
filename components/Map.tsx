import React from "react";
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

const Map = ({ destinationLatitude, destinationLongitude, selectedDriver }: MapProps) => {
  const { markers, region, loading, error } = useDriverData(destinationLatitude, destinationLongitude);

  if (loading) {
    return (
        <View className="flex justify-between items-center w-full">
          <ActivityIndicator size="small" color="#000" />
        </View>
    );
  }

  if (error) {
    return (
        <View className="flex justify-between items-center w-full">
          <Text>Error: {error}</Text>
        </View>
    );
  }

  return (
      <MapView
          provider={PROVIDER_DEFAULT}
          className="w-full h-full rounded-2xl"
          tintColor="black"
          mapType="mutedStandard"
          showsPointsOfInterest={false}
          initialRegion={region}
          showsUserLocation={true}
          userInterfaceStyle="light"
      >
        {markers.map((marker, index) => (
            <Marker
                key={marker.id ?? index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                image={
                  selectedDriver === +(marker.id ?? 0)
                      ? icons.selectedMarker
                      : icons.marker
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
                        latitude: region.latitude,
                        longitude: region.longitude,
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
