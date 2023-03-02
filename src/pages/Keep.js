import React, { useEffect } from "react";

const token = JSON.parse(localStorage.getItem("token"));

export const Keep = () => {
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, []);
  return <h1>Keep App</h1>;
};
