import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Field,
  Input,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Action/auth/logoutAction";
import { getUserBids } from "../../Redux/Action/bids/getUserBidsAction";
import { MyBidsTable } from "./MyBidsTable";
import { CreateAuctionForm } from "./CreateAuctionForm";
import { createAuctions } from "../../Redux/Action/dashboard/createAuctionsAction";

export const NavbarMenu = () => {
  const userData = useSelector((state) => state?.Login?.userData);
  const [isCreateNewAuctionOpen, setIsCreateNewAuctionOpen] = useState(false);
  const [isMyBidsOpen, setIsMyBidsOpen] = useState(false);
  const [myBids, setMyBids] = useState([]);
  const [auctionForm, setAuctionForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    startingBid: "",
  });
  const [error, setError] = useState({
    title: false,
    startTime: false,
    endTime: false,
    startingBid: false,
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const allFilled = Object.values(auctionForm).every(
      (val) => val.trim() !== ""
    );
    setIsDisabled(!allFilled);
  }, [auctionForm]);

  useEffect(() => {
    if (isMyBidsOpen) {
      dispatch(
        getUserBids({
          callback: (data) => {
            setMyBids(data?.data);
          },
        })
      );
    }
  }, [isMyBidsOpen]);

  const handleCreateAuction = () => {
    const newError = {
      title: auctionForm.title.trim() === "",
      startTime: auctionForm.startTime.trim() === "",
      endTime: auctionForm.endTime.trim() === "",
      startingBid: auctionForm.startingBid.trim() === "",
    };

    setError(newError);

    const hasError = Object.values(newError).some((val) => val === true);
    if (hasError) return;
    console.log(auctionForm);

    dispatch(
      createAuctions({
        payload: auctionForm,
        callback: (data) => {
          if (data?.meta?.code === 200) {
            console.log(data);
          }
        },
      })
    );
  };

  return (
    <>
      <Menu.Root positioning={{ placement: "left-start" }}>
        <Menu.Trigger asChild>
          <Button variant="surface" size={{ base: "xs", md: "md" }}>
            {userData?.name}
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="new-txt-a"
                onClick={() => setIsMyBidsOpen(true)}
              >
                My Active Bids
                {/* <Menu.ItemCommand>{2}</Menu.ItemCommand> */}
              </Menu.Item>
              <Menu.Item
                value="new-txt-b"
                onClick={() => setIsCreateNewAuctionOpen(true)}
              >
                Create New Auction
              </Menu.Item>
              <Menu.Item
                value="delete"
                color="fg.error"
                _hover={{ bg: "bg.error", color: "fg.error" }}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
      {isCreateNewAuctionOpen && (
        <Dialog.Root
          placement="center"
          motionPreset="scale"
          open={isCreateNewAuctionOpen}
          onOpenChange={(e) => setIsCreateNewAuctionOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Create New Auction</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <CreateAuctionForm
                    data={auctionForm}
                    setData={setAuctionForm}
                    error={error}
                    setError={setError}
                  />
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" colorPalette="red">
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      colorPalette="green"
                      onClick={handleCreateAuction}
                      disabled={isDisabled}
                    >
                      Submit
                    </Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
      {isMyBidsOpen && (
        <Dialog.Root
          placement="center"
          motionPreset="scale"
          open={isMyBidsOpen}
          onOpenChange={(e) => setIsMyBidsOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>My Active Bids</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <MyBidsTable bidsData={myBids} />
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </>
  );
};
