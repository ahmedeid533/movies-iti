import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function HeaderLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
