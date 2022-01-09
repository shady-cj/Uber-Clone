import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ActionItem from "./components/ActionItem";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    name: user.displayName,
                    photoUrl: user.photoURL,
                });
            } else {
                setUser(null);
                navigate("/login");
            }
        });
    }, []);
    return (
        <section className="Home-wrapper">
            <Map />
            <ActionItem user={user} signOut={signOut} auth={auth} />
        </section>
    );
};

export default Home;
