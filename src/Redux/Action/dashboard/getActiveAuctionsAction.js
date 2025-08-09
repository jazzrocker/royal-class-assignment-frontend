import {
  GET_ACTIVE_AUCTIONS,
  GET_ACTIVE_AUCTIONS_SUCCESS,
  GET_ACTIVE_AUCTIONS_FAILURE,
} from "../actionTypes";

export const getActiveAuctions = (payload) => ({
  type: GET_ACTIVE_AUCTIONS,
  payload,
});

export const getActiveAuctionsSuccess = (payload) => ({
  type: GET_ACTIVE_AUCTIONS_SUCCESS,
  payload,
});

export const getActiveAuctionsFailure = () => ({
  type: GET_ACTIVE_AUCTIONS_FAILURE,
});
