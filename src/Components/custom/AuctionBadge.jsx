import { Badge } from "@chakra-ui/react";
import React from "react";

export const AuctionBadge = ({ startTime, endTime }) => {
  const now = new Date();
  const auctionStart = new Date(startTime);
  const auctionEnd = new Date(endTime);

  let status = "";
  let colorPallete = "";

  if (now < auctionStart) {
    status = "Upcoming";
    colorPallete = "yellow";
  } else if (now >= auctionStart && now < auctionEnd) {
    status = "Live";
    colorPallete = "green";
  } else {
    status = "Ended";
    colorPallete = "red";
  }

  return (
    <Badge
      colorPalette={colorPallete}
      variant="surface"
      size="lg"
      width='100%'
      textAlign='center'
      display='flex'
      justifyContent='center'
      className={status === "Live" ? "pulse-animation" : ""}
    >
      {status}
    </Badge>
  );
};
