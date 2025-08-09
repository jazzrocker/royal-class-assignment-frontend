import React from "react";
import { LoginForm } from "../Components/custom/LoginForm";
import { Box } from "@chakra-ui/react";

export const Login = () => {
  document.title = "Login - Auction";
  return (
    <>
      <Box
        // height="100vh"
        display="flex"
        paddingTop="5rem"
        justifyContent="center"
      >
        <LoginForm />
      </Box>
    </>
  );
};
