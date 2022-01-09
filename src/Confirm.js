import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Map from "./components/Map";
import RideSelector from "./components/RideSelector";

const Confirm = () => {
    const [pickUp, setPickUp] = useState([]);
    const [dropOff, setDropOff] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const getPickUpCoordinates = useCallback((pickUpLocation) => {
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickUpLocation}.json?` +
                new URLSearchParams({
                    access_token:
                        "pk.eyJ1Ijoic2hhZHktY2VlamF5IiwiYSI6ImNreTV5bHI4MjBvd2QzMW95N3BobjB4aDQifQ.r3CMQNGDotqlelltM8GYow",
                    limit: 1,
                })
        )
            .then((resp) => resp.json())
            .then((data) => {
                // console.log(data);
                setPickUp(data.features[0]?.center);
            });
    }, []);
    const getDropOffCoordinates = useCallback((dropOffLocation) => {
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropOffLocation}.json?` +
                new URLSearchParams({
                    access_token:
                        "pk.eyJ1Ijoic2hhZHktY2VlamF5IiwiYSI6ImNreTV5bHI4MjBvd2QzMW95N3BobjB4aDQifQ.r3CMQNGDotqlelltM8GYow",
                    limit: 1,
                })
        )
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                setDropOff(data.features[0]?.center);
            });
    }, []);

    useEffect(() => {
        console.log();

        if (searchParams.get("pickup") && searchParams.get("dropoff")) {
            getPickUpCoordinates(searchParams.get("pickup"));
            getDropOffCoordinates(searchParams.get("dropoff"));
        } else {
            navigate("/search");
        }
    }, [getPickUpCoordinates, getDropOffCoordinates]);
    if (pickUp.length > 0 && dropOff.length > 0) {
        return (
            <div className="confirm_wrapper">
                <Link className="back-btn" to="/search">
                    <img
                        src="https://img.icons8.com/ios-filled/50/000000/left.png"
                        alt=""
                    />
                </Link>
                <Map pickUp={pickUp} dropOff={dropOff} />
                <RideSelector />
            </div>
        );
    } else {
        return <div className="loading_wrapper">Loading...</div>;
    }
};

export default Confirm;
