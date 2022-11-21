import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_FORGET_REQUEST,
  USER_FORGET_SUCCESS,
  USER_FORGET_FAIL,
  USER_TOKEN_VERIFY_REQUEST,
  USER_TOKEN_VERIFY_SUCCESS,
  USER_TOKEN_VERIFY_FAIL,
} from "../constant/userConstant";
import Cookie from "js-cookie";

function userSigReducer(state = {}, action) {
  const user = Cookie.getJSON("userInfo");
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, success: false, userInfo: user };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload, success: false };
    case USER_LOGOUT:
      return {};
    case "UNSUCCESS":
      return { userInfo: user };

    default:
      return state;
  }
}
function userResReducer(state = {}, action) {
  console.log("rgis");

  const user = Cookie.getJSON("userInfo");
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, success: false, userInfo: user };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
}
const userForgetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGET_REQUEST:
      return { loading: true, success: false };
    case USER_FORGET_SUCCESS:
      return { loading: false, data: "Email send to Email id", success: true };
    case USER_FORGET_FAIL:
      return { loading: false, error: "Invalide Email Id", success: false };
    case "RESET_FORGET":
      return {};
    default:
      return state;
  }
};
const tokenVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TOKEN_VERIFY_REQUEST:
      return { loading: true, success: false };
    case USER_TOKEN_VERIFY_SUCCESS:
      return { loading: false, data: " success ", success: true };
    case USER_TOKEN_VERIFY_FAIL:
      return {
        loading: false,
        error: "Try again forget password token expire ",
        success: false,
      };
    case "RESET_TOKEN":
      return {};
    default:
      return state;
  }
};

const updatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true, success: false };
    case USER_UPDATE_SUCCESS:
      return { loading: false, data: " success ", success: true };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: " error updating ",
        success: false,
      };
    case "RESET_TOKEN":
      return {};
    default:
      return state;
  }
};

export {
  userResReducer,
  userSigReducer,
  userForgetReducer,
  tokenVerifyReducer,
  updatePasswordReducer,
};
