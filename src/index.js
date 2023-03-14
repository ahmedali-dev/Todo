import React from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import RouterApp from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={RouterApp}></RouterProvider>
  </>
);
