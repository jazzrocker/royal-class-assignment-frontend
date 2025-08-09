import { Table } from "@chakra-ui/react";
import React from "react";
import { formatDateTime } from "../../Utils/Helper";

export const MyBidsTable = ({ bidsData }) => {
  return (
    <>
      <Table.ScrollArea
        borderWidth="1px"
        rounded="sm"
        maxHeight="50vh"
        interactive
      >
        <Table.Root size="sm" stickyHeader interactive>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader textAlign="center">
                Auction Room
              </Table.ColumnHeader>
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
              <Table.Row key={item._id}>
                <Table.Cell textAlign="center">{item.auctionTitle}</Table.Cell>
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
