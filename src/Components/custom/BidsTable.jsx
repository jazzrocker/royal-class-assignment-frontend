import { useEffect, useState } from "react";
import socketService from "../../Utils/socketService";
import { Table } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getBids } from "../../Redux/Action/bids/getBidsAction";
import { formatDateTime } from "../../Utils/Helper";

export const BidsTable = ({ bids, auctionId }) => {
  const dispatch = useDispatch();

  const [bidsData, setBidsData] = useState([]);
  const [highestBidId, setHighestBidId] = useState("");
  const [newBidId, setNewBidId] = useState("");
  const userData = useSelector((state) => state?.Login?.userData);

  useEffect(() => {
    const handleNewBid = (data) => {

      setNewBidId(data?.newBid?._id);
      setTimeout(() => setNewBidId(""), 5000);
      setBidsData((prevBidsData) => {
        const updatedBids = [data?.newBid, ...prevBidsData];

        updatedBids?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        const highestBid = updatedBids?.reduce((maxBid, currentBid) => {
          return currentBid.bidAmount > maxBid.bidAmount ? currentBid : maxBid;
        }, updatedBids[0]);

        setHighestBidId(highestBid._id);
        return updatedBids;
      });
    };

    socketService.on(`auctionRoom:${auctionId}:newBid`, handleNewBid);

    return () => {
      socketService.off(`auctionRoom:${auctionId}:newBid`, handleNewBid);
      setBidsData([]);
      setHighestBidId("");
      setNewBidId("");
    };
  }, [auctionId]);

  useEffect(() => {
    setBidsData(bids);
  }, [bids]);

  return (
    <>
      <Table.ScrollArea
        borderWidth="1px"
        rounded="sm"
        maxHeight="40vh"
        width="90%"
        interactive
      >
        <Table.Root size="sm" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader textAlign="center">
                Winning
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">Name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Bid Amount
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Placed At
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {bidsData?.map((item) => (
              <Table.Row
                key={item._id}
                bg={
                  item._id === newBidId
                    ? "purple.subtle"
                    : item._id === highestBidId
                    ? "green.subtle"
                    : item?.userId === userData?._id
                    ? "yellow.subtle"
                    : ""
                }
                className={item?._id === highestBidId ? "pulse-animation" : ""}
              >
                <Table.Cell textAlign="center">
                  {item?._id === highestBidId ? "⭐" : "-"}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {item.name}({item?.username})
                </Table.Cell>
                <Table.Cell textAlign="center">{item.bidAmount}</Table.Cell>
                <Table.Cell textAlign="center">
                  {formatDateTime(item.createdAt)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
      {bidsData?.length === 0 && "No Bids Yet"}
    </>
  );
};
