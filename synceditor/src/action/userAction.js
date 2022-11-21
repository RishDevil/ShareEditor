import axios from "axios";

import Cookie from "js-cookie";
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

// const update = ({ userId, name, email, password }) => async (
//   dispatch,
//   getState
// ) => {
//   const {
//     userData: { userInfo },
//   } = getState();
//   dispatch({
//     type: USER_UPDATE_REQUEST,
//     payload: { userId, name, email, password },
//   });
//   try {
//     const { data } = await Axios.put(
//       "/api/users/" + userId,
//       { name, email, password },
//       {
//         headers: {
//           Authorization: "Bearer " + userInfo.token,
//         },
//       }
//     );
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     Cookie.set("userInfo", JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// };

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  console.log(email, password);
  const { data } = await axios.post("http://localhost:4000/api/signin", {
    email,
    password,
  });
  console.log(data.msg.password, "datatatat");
  if (data.err) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: data.msg });
  } else {
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.msg });
    Cookie.set("userInfo", JSON.stringify(data.msg));
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  const { data } = await axios.post("http://localhost:4000/api/register", {
    name,
    email,
    password,
  });
  console.log("regsss", data);
  if (data.err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: data.msg });
  } else {
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.msg });
  }
};

const logoutAction = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};

const unsuccess = () => (dispatch) => {
  dispatch({ type: "UNSUCCESS" });
};
const resetPass = (email) => async (dispatch) => {
  dispatch({ type: USER_FORGET_REQUEST });
  const { data } = await axios.post("/api/users/forget", {
    email,
  });
  if (data.err) {
    dispatch({ type: USER_FORGET_FAIL });
  } else {
    dispatch({ type: USER_FORGET_SUCCESS });
  }
};
const resetForget = () => async (dispatch) => {
  dispatch({ type: "RESET_FORGET" });
};

const tokenVerify = (token) => async (dispatch) => {
  dispatch({ type: USER_TOKEN_VERIFY_REQUEST });
  const { data } = await axios.get("/api/users/verify/" + token);
  if (data.err) {
    dispatch({ type: USER_TOKEN_VERIFY_FAIL });
  } else {
    dispatch({ type: USER_TOKEN_VERIFY_SUCCESS });
  }
};
const updatePassword = (pass) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  const { data } = await axios.put("/api/users/updatePass", {
    pass,
  });
  if (data.err) {
    dispatch({ type: USER_UPDATE_FAIL });
  } else {
    dispatch({ type: USER_UPDATE_SUCCESS });
  }
};

export {
  signin,
  register,
  logoutAction,
  unsuccess,
  resetPass,
  resetForget,
  tokenVerify,
  updatePassword,
};
