import React, { useRef, useState, useCallback, useEffect } from "react";

const LocationInput = ({
    startingInput,
    destinationInput,
    setDestinationInput,
    setStartingInput,
    listOfPlaces,
    getSuggestionList,
}) => {
    const [currentInput, setCurrentInput] = useState(null);
    const suggestionRef = useRef(null);
    const setSuggestionBox = (e) => {
        const elem = e.target.getBoundingClientRect();
        suggestionRef.current.style.top = `${elem.bottom + 3}px`;
        suggestionRef.current.style.left = `${elem.left + 3}px`;
    };
    const loadBox = (e) => {
        if (e.target.value.length > 3) {
            getSuggestionList(e.target.value);
            setCurrentInput(e);
            suggestionRef.current.style.display = "block";
        } else {
            suggestionRef.current.style.display = "none";
            setCurrentInput(null);
        }
    };
    let listener = useCallback(
        (e) => {
            if (!e.target.closest(".suggestionBox")) {
                if (suggestionRef.current) {
                    suggestionRef.current.style.display = "none";
                }
            }
        },
        [suggestionRef]
    );
    useEffect(() => {
        window.addEventListener("click", listener);
        return function () {
            window.removeEventListener("click", listener);
        };
    }, [listener]);
    return (
        <div className="LocationInput-container">
            <div className="from-to-icons">
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
                    value={startingInput.name}
                    onChange={(e) => {
                        setStartingInput({
                            ...startingInput,
                            name: e.target.value,
                        });
                        loadBox(e);
                    }}
                    id="StartingInput"
                    type="text"
                    onFocus={setSuggestionBox}
                    placeholder="Enter pickup location"
                />
                <input
                    value={destinationInput.name}
                    onChange={(e) => {
                        setDestinationInput({
                            ...destinationInput,
                            name: e.target.value,
                        });
                        loadBox(e);
                    }}
                    id="DestinationInput"
                    type="text"
                    placeholder="Where to? "
                    onFocus={setSuggestionBox}
                />

                <div ref={suggestionRef} className="suggestionBox">
                    {listOfPlaces.length > 0 ? (
                        listOfPlaces.map((place, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        const targetId = currentInput.target.id;
                                        targetId === "StartingInput"
                                            ? setStartingInput({
                                                  name: place.place_name,
                                                  coords: place.center,
                                              })
                                            : setDestinationInput({
                                                  name: place.place_name,
                                                  coords: place.center,
                                              });

                                        suggestionRef.current.style.display =
                                            "none";
                                    }}
                                >
                                    {place.place_name}
                                </p>
                            );
                        })
                    ) : (
                        <p>No match...</p>
                    )}
                </div>
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
