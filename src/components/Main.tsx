import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from "../App";
import Failure from "../pages/Failure";
import Success from "../pages/Success";


const Main = () => {
    return (
        <div>
            <Router>
            <Route path="/" exact component={App} />
            <Route path="/success/:score" component={Success} />
            <Route path="/failure/:score" component={Failure} />
            </Router>
        </div>
    );
}

export default Main;