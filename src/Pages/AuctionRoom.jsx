import {
  Badge,
  Box,
  Button,
  ColorSwatch,
  HStack,
  Separator,
  Strong,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { joinAuction } from "../Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { AuctionEndsTimer } from "../Components/custom/AuctionEndsTimer";
import { BidsTable } from "../Components/custom/BidsTable";
import { CustomActionBar } from "../Components/custom/CustomActionBar";
import socketService from "../Utils/socketService";
import { notificationToast } from "../Utils/Helper";

export const AuctionRoom = () => {
  document.title = "Room - Auction";
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [auctionRoomData, setAuctionRoomData] = useState({});
  const userData = useSelector((state) => state?.Login?.userData);

  useEffect(() => {
    setAuctionRoomData(location?.state);
    if (!location?.state?._id) {
      console.log("Fetching from database:", auctionId);
    }
  }, [auctionId, location.state]);

  useEffect(() => {
    socketService.on(`auctionRoom:${auctionId}:notification`, (data) => {
      notificationToast(data?.notification);
    });
    socketService.on("room-left", (data) => {
      notificationToast(`You have left the auction ${location.state?.title}`);
      navigate("/");
    });
    return () => {
      socketService.off(`auctionRoom:${auctionId}:notification`);
      socketService.off("room-left");
    };
  }, [auctionId]);

  const handleLeaveAuction = () => {
    socketService.emit("leaveAuction", { auctionId });
  };

  return (
    <VStack width="100%">
      <VStack
        width="95%"
        padding="2rem"
        borderRadius="5px"
        boxShadow="rgba(37, 2, 124, 0.4) 0px 0px 0px 2px, rgba(49, 46, 175, 0.65) 0px 4px 6px -1px, rgba(11, 2, 138, 0.08) 0px 1px 0px inset;"
      >
        <Text textStyle="7xl">{auctionRoomData?.title}</Text>
        <AuctionEndsTimer dateTime={auctionRoomData?.endTime} />
      </VStack>
      <HStack justifyContent="space-between" padding="1rem" width="100%">
        <Button
          colorPalette="yellow"
          variant="surface"
          onClick={() => navigate("/")}
        >
          <IoMdArrowBack />
          Back to Lobby
        </Button>

        <Button
          colorPalette="red"
          variant="surface"
          onClick={handleLeaveAuction}
        >
          Leave Auction Room
          <LuLogOut />
        </Button>
      </HStack>

      {isMobile ? (
        <VStack padding="1rem">
          <Strong>Starting Bid Amount: {auctionRoomData?.startingBid}</Strong>
          <Separator orientation="horizontal" width="full" />
          <Strong>
            Current Highest Bid: {auctionRoomData?.currentHighestBid}
          </Strong>
        </VStack>
      ) : (
        <HStack>
          <Strong>Starting Bid Amount: {auctionRoomData?.startingBid}</Strong>
          <Separator orientation="vertical" height="8" />
          <Strong>
            Current Highest Bid: {auctionRoomData?.currentHighestBid}
          </Strong>
        </HStack>
      )}

      <HStack justifyContent="flex-end" width="90%">
        <Badge>
          <ColorSwatch value="#eef34bec" boxSize="0.82em" />
          Your Bids
        </Badge>
        <Badge>
          <ColorSwatch value="#bada55" boxSize="0.82em" />
          Winning Bid
        </Badge>
        <Badge>
          <ColorSwatch value="var(--themeColor)" boxSize="0.82em" />
          Latest Bid
        </Badge>
      </HStack>
      <BidsTable bids={auctionRoomData?.bids} auctionId={auctionId} />
      <CustomActionBar
        auctionId={auctionId}
        minAmount={auctionRoomData?.currentHighestBid}
        startingBid={auctionRoomData?.startingBid}
      />
    </VStack>
  );
};
