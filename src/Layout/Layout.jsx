import React from "react";
import { Navbar } from "../Components/custom/Navbar";
import { Box } from "@chakra-ui/react";
import { AllRoutes } from "../Routes/AllRoutes";
import { useSelector } from "react-redux";

export const Layout = () => {
  const isAuthenticated = useSelector((state) => state?.Login?.isAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      {isAuthenticated ? (
        <Box height="100vh" width="100%" paddingTop="5rem">
          <AllRoutes />
        </Box>
      ) : (
        <Box width="100%" height="100vh">
          <AllRoutes />
        </Box>
      )}
    </>
  );
};
