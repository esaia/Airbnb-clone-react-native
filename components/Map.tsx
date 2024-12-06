import { View, Text } from "react-native";
import React, { memo, useRef } from "react";
import airbnb from "@/assets/data/airbnb-list.json";
import { AirbnbList } from "@/types/types";
import { router } from "expo-router";
import { Marker } from "react-native-maps";
import AppText from "@/components/typography/AppText";
import MapView from "react-native-map-clustering";

const INITIAL_REGION = {
  latitude: 52.514191929150456,
  longitude: 13.456734695054609,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const Map = memo(() => {
  const mapRef = useRef<any>(null);

  const cluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View className="p-2 w-14 justify-center items-center  rounded-full bg-primary aspect-square shadow-inner border border-[#772626]">
          <AppText classNames="text-xs text-white">{points}</AppText>
        </View>
      </Marker>
    );
  };

  return (
    <View>
      <MapView
        ref={mapRef}
        animationEnabled={false}
        className="w-full h-full"
        provider="google"
        initialRegion={INITIAL_REGION}
        renderCluster={cluster}
        clusterColor="#fff"
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {(airbnb as AirbnbList[]).map((item) => {
          return (
            <Marker
              key={item.id}
              coordinate={{
                latitude: +item.latitude,
                longitude: +item.longitude,
              }}
              onPress={() => router.push(`/(tabs)/inbox`)}
            >
              <View className="bg-white rounded-full py-1 px-3  border-[1px] border-gray-500">
                <AppText classNames="text-md" thick="bold">
                  {item.price} $
                </AppText>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
});

export default Map;
