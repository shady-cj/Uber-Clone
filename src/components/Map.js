import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
// import Geocoder from "react-map-gl-geocoder";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic2hhZHktY2VlamF5IiwiYSI6ImNreTV5bHI4MjBvd2QzMW95N3BobjB4aDQifQ.r3CMQNGDotqlelltM8GYow";

const Map = ({ pickUp, dropOff, setRideDuration }) => {
    const [showDirection, setShowDirection] = useState(false);
    const navigate = useNavigate();
    const instructionRef = useRef(null);
    // create a function to make a directions request
    const getRoute = useCallback(
        async (start, end, map) => {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            const query = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
                { method: "GET" }
            );
            const json = await query.json();

            if (json.code === "InvalidInput") {
                navigate("/search");
                return;
            }
            const data = json.routes[0];

            const route = data.geometry.coordinates;
            const geojson = {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: route,
                },
            };
            // if the route already exists on the map, we'll reset it using setData
            if (map.getSource("route")) {
                map.getSource("route").setData(geojson);
            }
            // otherwise, we'll make a new request
            else {
                map.addLayer({
                    id: "route",
                    type: "line",
                    source: {
                        type: "geojson",
                        data: geojson,
                    },
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#3887be",
                        "line-width": 5,
                        "line-opacity": 0.75,
                    },
                });
            }

            const instructions = instructionRef.current;
            const steps = data.legs[0].steps;
            setRideDuration(data.duration / 100);
            let tripInstructions = "";
            for (const step of steps) {
                tripInstructions += `<li>${step.maneuver.instruction}</li>`;
            }
            instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
                data.duration / 60
            )} min 🚗 (${(data.distance / 1000).toFixed(
                2
            )}km)</strong></p><ol>${tripInstructions}</ol>`;
        },
        [navigate, setRideDuration]
    );

    const loadMap = useCallback((lat, lon) => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lat, lon],
            zoom: 7,
        });
        return map;
    }, []);
    const addMarker = useCallback((map, coord) => {
        // .setLngLat([lat, lon])
        const marker1 = new mapboxgl.Marker().setLngLat(coord).addTo(map);
        return marker1;
    }, []);

    useEffect(() => {
        if (pickUp && dropOff) {
            // loadMap(props.pickUp, props.dropOff, true);
            setShowDirection(true);
            const mapRef = loadMap(...pickUp);
            addMarker(mapRef, pickUp);
            addMarker(mapRef, dropOff);
            mapRef.fitBounds([pickUp, dropOff], {
                padding: 120,
            });
            mapRef.on("load", () => {
                // make an initial directions request that
                // starts and ends at the same location
                getRoute(pickUp, dropOff, mapRef);

                // Add starting point to the mapRef
                mapRef.addLayer({
                    id: "point",
                    type: "circle",
                    source: {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [
                                {
                                    type: "Feature",
                                    properties: {},
                                    geometry: {
                                        type: "Point",
                                        coordinates: pickUp,
                                    },
                                },
                            ],
                        },
                    },
                    paint: {
                        "circle-radius": 10,
                        "circle-color": "#3887be",
                    },
                });
                // this is where the code from the next step will go
            });
        } else {
            setShowDirection(false);
            let bounds;
            let mapArea;
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
                                mapArea = loadMap(-99.29011, 39.39172);
                                bounds = [
                                    [-99.069003, 39.385273],
                                    [-99.303707, 39.412333],
                                ];
                                mapArea.setMaxBounds(bounds);
                            }
                        }
                    );
                } else {
                    console.log("Not supported");
                }
            });

            locationPromise.then(function (value) {
                mapArea = loadMap(value.lat, value.lon);
                bounds = [
                    [value.lat - 0.50669, value.lon - 0.13478],
                    [value.lat + 0.448616, value.lon + 0.1088579],
                ];

                mapArea.setMaxBounds(bounds);
            });
        }
    }, [loadMap, addMarker, pickUp, dropOff, getRoute]);

    return (
        <>
            <div id="map" className="mapArea" />

            {pickUp && dropOff && (
                <div className="instructionArea">
                    <header
                        onClick={() => {
                            setShowDirection(true);
                        }}
                    >
                        Directions
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M502.61 233.32L278.68 9.39c-12.52-12.52-32.83-12.52-45.36 0L9.39 233.32c-12.52 12.53-12.52 32.83 0 45.36l223.93 223.93c12.52 12.53 32.83 12.53 45.36 0l223.93-223.93c12.52-12.53 12.52-32.83 0-45.36zm-100.98 12.56l-84.21 77.73c-5.12 4.73-13.43 1.1-13.43-5.88V264h-96v64c0 4.42-3.58 8-8 8h-32c-4.42 0-8-3.58-8-8v-80c0-17.67 14.33-32 32-32h112v-53.73c0-6.97 8.3-10.61 13.43-5.88l84.21 77.73c3.43 3.17 3.43 8.59 0 11.76z" />
                        </svg>
                        {showDirection && (
                            <img
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDirection(false);
                                }}
                                src="images/cancel.png"
                                alt=""
                            />
                        )}
                    </header>

                    <div
                        ref={instructionRef}
                        className={
                            showDirection
                                ? "instructions"
                                : "instructions hideInstructions"
                        }
                    ></div>
                </div>
            )}
        </>
    );
};

export default Map;
