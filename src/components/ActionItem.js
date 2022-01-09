import React from "react";
import { Link } from "react-router-dom";
const ActionItem = ({ user, signOut, auth }) => {
    return (
        <div className="actionItems">
            <div className="actionItems_header">
                <img
                    src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg"
                    alt="uber"
                    className="actionItems_uberLogo"
                />
                <div className="profileInfoContainer">
                    <span className="profile_name">{user && user.name}</span>
                    <img
                        src={user && user.photoUrl}
                        alt=""
                        className="profile_picture"
                        onClick={() => signOut(auth)}
                    />
                </div>
            </div>
            <div className="actionItems_actionbuttons">
                <Link className="actionButton" to="/search">
                    <img src="https://i.ibb.co/cyvcpfF/uberx.png" alt="" />
                    Ride
                </Link>

                <div className="actionButton">
                    <img src="https://i.ibb.co/n776JLm/bike.png" alt="" />
                    Wheels
                </div>
                <div className="actionButton">
                    <img
                        src=" https://i.ibb.co/5RjchBg/uberschedule.png"
                        alt=""
                    />
                    Reserve
                </div>
            </div>
            <div className="whereToContainer">Where to?</div>
        </div>
    );
};

export default ActionItem;
