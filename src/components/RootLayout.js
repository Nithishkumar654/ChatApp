import React from "react";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div
      className="container p-0 shadow vh-100 d-flex flex-column pt-2 pb-2 rounded"
      style={{ position: "relative" }}
    >
      <div className="rounded-top" style={{ height: "10%" }}>
        <NavigationBar />
      </div>
      <div
        className="d-flex bg-danger bg-opacity-10 rounded-bottom"
        style={{ height: "90%" }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
