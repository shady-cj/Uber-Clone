import React, { useState } from "react";
import { carList } from "../data/carList";
const RideSelector = ({ rideDuration }) => {
    const [service, setService] = useState("UberX");
    return (
        <div className="ride-container">
            <div className="rideSelectorWrapper">
                <div className="rideSelectorTitle">
                    Choose a ride, or swipe up for more
                </div>
                <div className="rideSelectorTitle-lg">Choose a Ride Below</div>

                <div className="carSelectorList">
                    {carList.map((car, index) => {
                        return (
                            <div
                                onClick={(e) => setService(car.service)}
                                key={index}
                                className="car"
                            >
                                <img src={car.imgUrl} alt="" />
                                <div className="car_details">
                                    <span className="service">
                                        {car.service}
                                    </span>
                                    <span className="time">
                                        {Math.ceil(Math.random() * 10)} min away
                                    </span>
                                </div>
                                <div className="price">
                                    {rideDuration &&
                                        "$" +
                                            (
                                                rideDuration * car.multiplier
                                            ).toFixed(2)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="confirmRideContainer">
                <button>Confirm {service}</button>
            </div>
        </div>
    );
};

export default RideSelector;
