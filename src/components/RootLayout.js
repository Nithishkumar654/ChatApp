import React from "react";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div
      className="container p-0 d-flex flex-column vh-100 pt-2 pb-2 rounded" //vh-100
      style={{ position: "relative" }}
    >
      <div
        className="rounded-top w-100"
        style={{ position: "absolute", zIndex: "1", height: "10%" }}
      >
        <NavigationBar />
      </div>
      <div
        className="d-flex bg-danger bg-opacity-10 rounded-bottom mt-auto"
        style={{ height: "90%" }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
