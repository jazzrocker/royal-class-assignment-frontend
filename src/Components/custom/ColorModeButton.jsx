"use client";

import React from "react";
import { IconButton, Skeleton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { ClientOnly } from "@chakra-ui/react";

export function ColorModeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <ClientOnly fallback={<Skeleton boxSize="8" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        {resolvedTheme === "light" ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  );
}