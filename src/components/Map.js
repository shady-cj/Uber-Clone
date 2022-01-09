import React, { useEffect, useState, useCallback } from "react";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
// import Geocoder from "react-map-gl-geocoder";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hhZHktY2VlamF5IiwiYSI6ImNreTV5bHI4MjBvd2QzMW95N3BobjB4aDQifQ.r3CMQNGDotqlelltM8GYow";

const Map = ({ pickUp, dropOff }) => {
    const loadMap = useCallback((lat, lon) => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph",
            center: [lat, lon],
            zoom: 7,
        });
        return map;
    }, []);
    const addMarker = useCallback((map, coord) => {
        // .setLngLat([lat, lon])
        const marker1 = new mapboxgl.Marker().setLngLat(coord).addTo(map);
    }, []);

    useEffect(() => {
        if (pickUp && dropOff) {
            // loadMap(props.pickUp, props.dropOff, true);
            const mapRef = loadMap(...pickUp);
            addMarker(mapRef, pickUp);
            addMarker(mapRef, dropOff);
            mapRef.fitBounds([pickUp, dropOff], {
                padding: 120,
            });
            mapRef.on("load", () => {
                mapRef.addSource("route", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: [pickUp, dropOff],
                        },
                    },
                });
                mapRef.addLayer({
                    id: "route",
                    type: "line",
                    source: "route",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#888",
                        "line-width": 8,
                    },
                });
            });
        } else {
            let locationPromise = new Promise(function (resolve, reject) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function (pos) {
                            let lat = pos.coords.latitude;
                            let lon = pos.coords.longitude;
                            resolve({ lat, lon });
                        },
                        function (err) {
                            if (err.code === err.PERMISSION_DENIED) {
                                // pop up dialog asking for location
                                loadMap(-99.29011, 39.39172);
                            }
                        }
                    );
                } else {
                    console.log("Not supported");
                }
            });

            locationPromise.then(function (value) {
                loadMap(value.lat, value.lon);
            });
        }
    }, [loadMap, addMarker, pickUp, dropOff]);
    return <div id="map" className="mapArea" />;
};

export default Map;
