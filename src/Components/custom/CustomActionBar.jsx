import {
  ActionBar,
  Button,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { placeBid } from "../../Redux/Action";
import { useState } from "react";
import socketService from "./../../Utils/socketService";

export const CustomActionBar = ({ auctionId, minAmount }) => {
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const userData = useSelector((state) => state?.Login?.userData);
  
  const handlePlaceBid = () => {
    const payload = {
      auctionId,
      bidAmount,
      userId: userData?._id,
    };
    socketService.emit("placeBid", payload);
    // dispatch(
    //   placeBid({
    //     method: "place",
    //     payload,
    //     callback: (data) => {
    //       if (data?.meta?.code === 200) {
    //         console.log(data);
    //       }
    //     },
    //   })
    // );
  };

  const handleBidAmountChange = (e) => {
    e.preventDefault();

    const amount = e?.target?.value;

    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(amount)) {
      setBidAmount(Number(amount));

      if (Number(amount) < minAmount) {
        setIsError(true);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setIsDisabled(false);
      }
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <ActionBar.Root open closeOnInteractOutside={false}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                Current Highest Amount: {minAmount}
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Dialog.Root placement="center" motionPreset="scale">
                <Dialog.Trigger asChild>
                  <Button
                    colorPalette="green"
                    size="sm"
                    className="pulse-animation"
                    boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
                  >
                    <IoAddCircle />
                    Place Bid
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Place Bid</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Field.Root invalid={isError}>
                          <Field.Label>Enter Amount</Field.Label>
                          <Input
                            placeholder="Enter Amount"
                            value={bidAmount}
                            onChange={handleBidAmountChange}
                          />
                          <Field.ErrorText>
                            Amount should be large than highest bid.
                          </Field.ErrorText>
                        </Field.Root>
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
                            onClick={handlePlaceBid}
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
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};
