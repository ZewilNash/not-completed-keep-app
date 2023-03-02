import { Link } from "react-router-dom";

import loginLogoImage from "../images/note-banner.png";

export const Home = ({ switchLight }) => {
  const styles = {
    backgroundColor: switchLight ? "#141627" : "#FE4370",
    color: switchLight ? "#fff" : "#000"
  };

  return (
    <div className="home">
      <div className="home-intro-left">
        <div className="top-sec">
          <h1>Welcome To KeepGrep App </h1>
          <p>Start Your Journey Of Success By Login To Our App </p>
          <p>And Remember Don't Miss A Note! ❤ </p>
          <Link to="/info">
            <button style={styles}>Know More About Us</button>
          </Link>
        </div>
      </div>

      <div className="home-intro-right">
        <img className="banner" src={loginLogoImage} alt="login-banner" />
      </div>
    </div>
  );
};
