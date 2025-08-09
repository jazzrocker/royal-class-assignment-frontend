import {
  GET_USERDATA,
  GET_USERDATA_SUCCESS,
  GET_USERDATA_FAILURE,
} from "../actionTypes";

export const getUserdata = (payload) => ({
  type: GET_USERDATA,
  payload,
});

export const getUserdataSuccess = (payload) => ({
  type: GET_USERDATA_SUCCESS,
  payload,
});

export const getUserdataFailure = () => ({
  type: GET_USERDATA_FAILURE,
});
