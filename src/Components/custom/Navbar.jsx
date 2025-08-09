import { Box, HStack } from "@chakra-ui/react";
import { NavbarMenu } from "./NavbarMenu";
import { ColorModeButton } from "./ColorModeButton";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const { resolvedTheme } = useTheme();

  return (
    <HStack
      position="fixed"
      zIndex="100"
      w="100%"
      display="flex"
      flexDirection="column"
      boxShadow={
        resolvedTheme === "dark"
          ? "rgba(255, 255, 255, 0.15) 1.95px 1.95px 2.6px"
          : "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      }
    >
      <HStack
        w="100%"
        display="flex"
        padding="12px"
        justifyContent="space-between"
        boxShadow="rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          <Box
            gap="1rem"
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <NavbarMenu />
            <ColorModeButton />
          </Box>
        </Box>
      </HStack>
    </HStack>
  );
};
