import {
  PLACE_BID,
  PLACE_BID_SUCCESS,
  PLACE_BID_FAILURE,
} from "../actionTypes";

export const placeBid = (payload) => ({
  type: PLACE_BID,
  payload,
});

export const placeBidSuccess = (payload) => ({
  type: PLACE_BID_SUCCESS,
  payload,
});

export const placeBidFailure = () => ({
  type: PLACE_BID_FAILURE,
});
