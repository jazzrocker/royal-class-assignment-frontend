import { GET_BIDS, GET_BIDS_SUCCESS, GET_BIDS_FAILURE } from "../actionTypes";

export const getBids = (payload) => ({
  type: GET_BIDS,
  payload,
});

export const getBidsSuccess = (payload) => ({
  type: GET_BIDS_SUCCESS,
  payload,
});

export const getBidsFailure = () => ({
  type: GET_BIDS_FAILURE,
});
