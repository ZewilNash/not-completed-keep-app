import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import { Info } from "./pages/Info";
import { useState } from "react";
import { Keep } from "./pages/Keep";

const token = JSON.parse(localStorage.getItem("token"));

export default function App() {
  const [switchLight, setSwitchLight] = useState(false);

  const styles = {
    backgroundColor: switchLight ? "#FE4370" : "#0f0f0f",
    color: switchLight ? "#000000" : "#ffff"
  };

  return (
    <BrowserRouter>
      <div className="container" style={styles}>
        <Navbar
          token={token}
          setSwitchLight={setSwitchLight}
          switchLight={switchLight}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home switchLight={switchLight} />}
          />
          <Route path="/keep" component={() => <Keep />} />
          <Route
            exact
            path="/login"
            component={() => <Login switchLight={switchLight} />}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/info" component={Info} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
