import React, { useState, useCallback } from "react";
import LocationInput from "./components/LocationInput";
import { useNavigate, Link } from "react-router-dom";

const Search = () => {
    const [startingInput, setStartingInput] = useState({
        name: "",
        coords: [],
    });
    const [destinationInput, setDestinationInput] = useState({
        name: "",
        coords: [],
    });
    const [listOfPlaces, setListOfPlaces] = useState([]);
    let navigate = useNavigate();
    const validateInput = () => {
        if (
            startingInput.name.trim().length > 1 &&
            destinationInput.name.trim().length > 1
        ) {
            navigate(
                `/confirm?${new URLSearchParams({
                    pickup: startingInput.name.trim(),
                    dropoff: destinationInput.name.trim(),
                    coords1: startingInput.coords,
                    coords2: destinationInput.coords,
                })}`
            );
        } else {
            alert("Fill up the Form");
        }
    };

    const getSuggestionList = useCallback((query) => {
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoic2hhZHktY2VlamF5IiwiYSI6ImNreTV5bHI4MjBvd2QzMW95N3BobjB4aDQifQ.r3CMQNGDotqlelltM8GYow`
        )
            .then((resp) => resp.json())
            .then((data) => {
                data.features
                    ? setListOfPlaces(data.features)
                    : setListOfPlaces([]);
            });
    }, []);
    return (
        <section className="search_wrapper">
            <Link to="/" className="backBtnCon">
                <img
                    src="https://img.icons8.com/ios-filled/50/000000/left.png"
                    alt=""
                />
            </Link>
            <LocationInput
                startingInput={startingInput}
                destinationInput={destinationInput}
                setDestinationInput={setDestinationInput}
                setStartingInput={setStartingInput}
                listOfPlaces={listOfPlaces}
                getSuggestionList={getSuggestionList}
            />
            <div className="saved-places">
                <img
                    src="https://img.icons8.com/ios-filled/50/ffffff/star--v1.png"
                    alt=""
                />
                Saved Places
            </div>
            <div className="confirmButtonContainer" onClick={validateInput}>
                Confirm Locations
            </div>
        </section>
    );
};

export default Search;
