import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../Components/ui/empty-state";
import { ImFilesEmpty } from "react-icons/im";
import { GoArrowLeft } from "react-icons/go";

export const PageNotFound = () => {
  document.title = "Page Not Found - Auction";
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box padding="2rem" textAlign="center">
        <EmptyState
          colorPalette="red"
          icon={<ImFilesEmpty />}
          title="Page Not Found"
          description="The page you’re looking for doesn’t exist or may have been moved. Please go back or return to the homepage."
        >
          <Box
            display="flex"
            gap="1rem"
            justifyContent="center"
            marginTop="2rem"
          >
            <Button variant="outline" onClick={() => navigate(-1)}>
              <GoArrowLeft />
              Go Back
            </Button>
            <Button colorScheme="red" onClick={() => navigate("/")}>
              Home
            </Button>
          </Box>
        </EmptyState>
      </Box>
    </Box>
  );
};
