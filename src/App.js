import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Search from "./Search";
import Error from "./Error";
import Confirm from "./Confirm";
function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/search" element={<Search />} />
                    <Route path="/confirm" element={<Confirm />} />

                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
