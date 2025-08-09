import {
  JOIN_AUCTION,
  JOIN_AUCTION_SUCCESS,
  JOIN_AUCTION_FAILURE,
} from "../actionTypes";

export const joinAuction = (payload) => ({
  type: JOIN_AUCTION,
  payload,
});

export const joinAuctionSuccess = (payload) => ({
  type: JOIN_AUCTION_SUCCESS,
  payload,
});

export const joinAuctionFailure = () => ({
  type: JOIN_AUCTION_FAILURE,
});
