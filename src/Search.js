import React, { useState } from "react";
import LocationInput from "./components/LocationInput";
import { useNavigate, Link } from "react-router-dom";

const Search = () => {
    const [startingInput, setStartingInput] = useState("");
    const [destinationInput, setDestinationInput] = useState("");
    let navigate = useNavigate();
    const validateInput = () => {
        if (
            startingInput.trim().length > 1 &&
            destinationInput.trim().length > 1
        ) {
            navigate(
                `/confirm?${new URLSearchParams({
                    pickup: startingInput.trim(),
                    dropoff: destinationInput.trim(),
                })}`
            );
        } else {
            alert("Fill up the Form");
        }
    };
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
