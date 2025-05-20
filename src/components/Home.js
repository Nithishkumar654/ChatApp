import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homeImage from "../assets/Home.png";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/chat");
  }, []);

  return (
    <div
      className="border w-100 d-flex bg- bg-opacity-50"
      style={{ maxHeight: "100%" }}
    >
      <img
        className="img-fluid m-auto p-5 rounded-circle"
        style={{ maxHeight: "80%" }}
        src={homeImage}
        alt="Home"
      />
    </div>
  );
}

export default Home;
