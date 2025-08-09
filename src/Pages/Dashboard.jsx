import {
  Box,
  Button,
  HStack,
  Separator,
  Strong,
  Table,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AuctionBadge } from "../Components/custom/AuctionBadge";
import { CiLogin } from "react-icons/ci";
import { useEffect, useState } from "react";
import { getActiveAuctions, joinAuction } from "../Redux/Action";
import { IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { formatDateTime, notificationToast } from "../Utils/Helper";
import socketService from "../Utils/socketService";

export const Dashboard = () => {
  document.title = "Dashboard - Auction";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeAuctions, setActiveAuctions] = useState([]);
  const userData = useSelector((state) => state?.Login?.userData);

  const fetchActiveAuctions = () => {
    dispatch(
      getActiveAuctions({
        callback: (data) => {
          if (data?.meta?.code === 200) {
            setActiveAuctions(data?.data?.auctions);
          }
        },
      })
    );
  };

  const handleNewAuction = (data) => {
    setActiveAuctions((prev) => {
      const updated = [...prev, data];
      updated.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
      return updated;
    });
  };

  useEffect(() => {
    fetchActiveAuctions();
    socketService.on("room-joined", (data) => {
      notificationToast(`You have joined the auction ${data?.title}`);
      navigate(`/auction-room/${data?._id}`, {
        state: data,
      });
    });
    socketService.on("auctionEnd", fetchActiveAuctions);
    return () => {
      socketService.off("auctionEnd", fetchActiveAuctions);
      socketService.off("room-joined");
    };
  }, []);

  const handleJoinAuction = (auctionId) => {
    const payload = {
      auctionId,
    };
    socketService.emit("joinAuction", payload);
  };

  return (
    <Box padding="2rem">
      <Table.ScrollArea
        borderWidth="1px"
        rounded="sm"
        maxHeight="40vh"
        width="100%"
        interactive
      >
        <Table.Root size="sm" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader textAlign="center">Status</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Title</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Starting Bid Amount
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Highest Bid Amount
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Start Time
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                End Time
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {activeAuctions?.map((item) => {
              const now = new Date();
              const auctionStart = new Date(item?.startTime);
              const auctionEnd = new Date(item?.endTime);

              const isUpcoming = now < auctionStart;
              const isLive = now >= auctionStart && now < auctionEnd;
              const isEnded = now >= auctionEnd;

              const alreadyJoined = item?.participants?.includes(userData?._id);

              const colorPalette = isEnded
                ? "red"
                : isLive
                ? "green"
                : "yellow";

              return (
                <Table.Row key={item._id}>
                  <Table.Cell textAlign="center" width="7%">
                    <AuctionBadge
                      startTime={item?.startTime}
                      endTime={item?.endTime}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Strong>{item?.title}</Strong>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {item?.startingBid}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {item?.currentHighestBid}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {formatDateTime(item.startTime)}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {formatDateTime(item.endTime)}
                  </Table.Cell>
                  <Table.Cell textAlign="center" width="10%">
                    <Button
                      colorPalette={colorPalette}
                      variant="solid"
                      disabled={isEnded || !isLive}
                      width="100%"
                      onClick={() => handleJoinAuction(item?._id)}
                    >
                      {isEnded
                        ? "Auction Ended"
                        : isUpcoming
                        ? "Auction will start"
                        : alreadyJoined
                        ? "Return to Auction"
                        : "Join Auction"}

                      {isEnded ? (
                        ""
                      ) : isUpcoming ? (
                        ""
                      ) : alreadyJoined ? (
                        <IoIosReturnLeft />
                      ) : (
                        <CiLogin />
                      )}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </Box>
  );
};
