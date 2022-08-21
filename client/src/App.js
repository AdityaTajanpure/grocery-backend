import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Login from "./components/authentication/Login";
import Wrapper from "./components/layout/Wrapper";
import Register from "./components/authentication/Register";
import Landing from "./components/layout/Landing";
import HomePage from "./components/home/HomePage";
import ReferUser from "./components/layout/ReferUser";

//*Redux imports
import { Provider } from "react-redux";
import store from "./store.js";
import { loadUser } from "./actions/auth";
import Refer from "./components/layout/Refer";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Wrapper child={<Login />} />} />
          <Route
            exact
            path="/register"
            element={<Wrapper child={<Register />} />}
          />
          <Route
            exact
            path="/home"
            element={<Wrapper child={<HomePage />} />}
          />
          <Route
            exact
            path="/refer/:id"
            element={<Wrapper child={<Refer />} />}
          />
          <Route
            exact
            path="/refer/"
            element={<Wrapper child={<ReferUser />} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
