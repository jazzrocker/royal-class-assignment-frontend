import React, { useEffect, useState } from "react";
import { Box, Text, VStack, HStack, Badge, Separator } from "@chakra-ui/react";

export const AuctionEndsTimer = ({ dateTime }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (!dateTime) return;

    const targetTime = new Date(dateTime).getTime();
    if (isNaN(targetTime)) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setEnded(true);
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [dateTime]);

  if (!dateTime || isNaN(new Date(dateTime))) return null;

  if (ended) {
    return (
      <Badge colorPalette="red" border="1px solid" fontSize="xs" textAlign="center">
        Auction Ended
      </Badge>
    );
  }

  const display = timeLeft || { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <Badge colorPalette="yellow" border="1px solid" fontSize="xs" textAlign="center">
      <Box textAlign="center" padding="0.5rem">
        <HStack justifyContent="space-evenly" alignItems="center">
          {["days", "hours", "minutes", "seconds"].map((key, index) => (
            <React.Fragment key={key}>
              <VStack>
                <Text fontSize="xl" fontWeight="bold">
                  {display[key]}
                </Text>
                <Text fontSize="xs">{key.toUpperCase()}</Text>
              </VStack>
              {index < 3 && <Separator orientation="vertical" height="4" />}
            </React.Fragment>
          ))}
        </HStack>
      </Box>
    </Badge>
  );
};
