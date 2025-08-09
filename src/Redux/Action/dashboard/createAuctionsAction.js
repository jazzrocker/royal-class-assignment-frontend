import {
  CREATE_AUCTION,
  CREATE_AUCTION_SUCCESS,
  CREATE_AUCTION_FAILURE,
} from "../actionTypes";

export const createAuctions = (payload) => ({
  type: CREATE_AUCTION,
  payload,
});

export const createAuctionsSuccess = (payload) => ({
  type: CREATE_AUCTION_SUCCESS,
  payload,
});

export const createAuctionsFailure = () => ({
  type: CREATE_AUCTION_FAILURE,
});
