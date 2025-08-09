import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Login } from "../Pages/Login";
import { useSelector } from "react-redux";
import { Dashboard } from "../Pages/Dashboard";
import { Signup } from "../Pages/Signup";
import { PageNotFound } from "../Pages/PageNotFound";
import { AuctionRoom } from "../Pages/AuctionRoom";

export const AllRoutes = () => {
  const isAuthenticated = useSelector((state) => state?.Login?.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
      />

      <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route
        path="/auction-room/:auctionId"
        element={<ProtectedRoute element={<AuctionRoom />} />}
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
