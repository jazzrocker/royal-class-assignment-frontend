import React from "react";
import { VStack } from "@chakra-ui/react";
import { SignupForm } from "../Components/custom/SignupForm"

export const Signup = () => {
  document.title = "Signup - Auction";
  return (
    <VStack height="100vh" paddingTop="2rem">
      <SignupForm />
    </VStack>
  );
};
