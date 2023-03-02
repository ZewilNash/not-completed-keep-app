import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ setSwitchLight, switchLight, token }) => {
  const NavLinks = () => {
    if (token) {
      return <button className="logout-btn">Logout</button>;
    }

    return (
      <div>
        <Link className="link" to="/login">
          Login
        </Link>
        <Link className="link" to="/signup">
          Signup
        </Link>
      </div>
    );
  };

  function handleSwithLight() {
    setSwitchLight((prev) => !prev);
  }

  return (
    <nav className="navbar">
      <div className="switch-light">
        <label className="switch">
          <input type="checkbox" onChange={handleSwithLight} />
          <span className="slider round"></span>
        </label>
      </div>

      {/* <div className="logo">
        <img src={logo} alt="logo" />
      </div> */}

      <div className="auth">
        <NavLinks />
      </div>
    </nav>
  );
};
