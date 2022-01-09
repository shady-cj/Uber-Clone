import React from "react";

const LocationInput = ({
    startingInput,
    destinationInput,
    setDestinationInput,
    setStartingInput,
}) => {
    return (
        <div className="LocationInput-container">
            <div class="from-to-icons">
                <img
                    className="circle-icon"
                    src=" https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png"
                    alt=""
                />
                <img
                    className="line-icon"
                    src=" https://img.icons8.com/ios/50/9CA3AF/vertical-line.png"
                    alt=""
                />
                <img
                    src="https://img.icons8.com/windows/50/000000/square-full.png"
                    alt=""
                    className="square-icon"
                />
            </div>
            <div className="text-input-container">
                <input
                    value={startingInput}
                    onChange={(e) => setStartingInput(e.target.value)}
                    type="text"
                    placeholder="Enter pickup location"
                />
                <input
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    type="text"
                    placeholder="Where to? "
                />
            </div>
            <img
                src="https://img.icons8.com/ios/50/000000/plus-math.png"
                alt=""
                className="plus-icon"
            />
        </div>
    );
};

export default LocationInput;
