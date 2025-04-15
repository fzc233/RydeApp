import { useState, useEffect } from "react";
import { useLocationStore, useDriverStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";
import { useFetch } from "@/lib/fetch";
import { calculateDriverTimes, calculateRegion, generateMarkersFromData } from "@/lib/map";

export const useDriverData = (destinationLatitude: number | null, destinationLongitude: number | null) => {
    const { userLongitude, userLatitude } = useLocationStore();
    const { setDrivers } = useDriverStore();

    const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        if (Array.isArray(drivers) && userLatitude && userLongitude) {
            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude,
            });
            setMarkers(newMarkers);
        }
    }, [drivers, userLatitude, userLongitude]);

    useEffect(() => {
        if (markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateDriverTimes({
                markers,
                userLatitude,
                userLongitude,
                destinationLatitude,
                destinationLongitude,
            }).then((drivers) => {
                if (drivers) {
                    const formattedDrivers = drivers.map((driver) => ({
                        ...driver,
                        time: driver.time ? Math.round(driver.time) : 0, // rounding time
                    }));
                    setDrivers(formattedDrivers as MarkerData[]);
                }
            });
        }
    }, [markers, destinationLatitude, destinationLongitude]);

    const region = calculateRegion({
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
    });

    return { markers, region, loading, error };
};
