import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import NewNavbar from "./components/NewNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CareTakerProfile from "./pages/CareTakerProfile";

function App() {
  return (
    <Router>
      <NewNavbar />
      <div className="App">
        <Switch>
          <Route path="/caretaker">
            <CareTakerProfile/>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
