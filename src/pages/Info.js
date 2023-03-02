import React from "react";
import personalImg from "../images/personal.png";
// import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faWhatsapp,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";

export const Info = () => {
  return (
    <div className="info-container">
      <header className="info-img-header">
        <img src={personalImg} alt="my-img" />
      </header>

      <div className="personal-info">
        <span>Abdelrahman Mohammed</span>
        <p>Web Devoleper</p>
        <div className="details">
          <small className="phone">+2001021568465</small>
          <small>and also contact with me via:</small>
          <div className="social-info">
            {/* todo make a real contact with the user */}
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faYoutube} />
            <FontAwesomeIcon icon={faWhatsapp} />
            <FontAwesomeIcon icon={faTelegram} />
          </div>
        </div>
      </div>
    </div>
  );
};
