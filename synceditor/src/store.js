import {
  userResReducer,
  userSigReducer,
  userForgetReducer,
  tokenVerifyReducer,
  updatePasswordReducer,
} from "./reducer/userReducer";
// import {
//   postListReducer,
//   postCreateReducer,
//   postDeleteReducer,
//   postDetailReducer,
//   postReviewReducer,
//   removeReviewReducer,
//   postLikeReducer,
//   postUnlikeReducer,
// } from "./reducer/postReducer";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  userSignin: { userInfo },
};

const reducer = combineReducers({
  //   postList: postListReducer,
  //   postDetail: postDetailReducer,
  //   postDelete: postDeleteReducer,
  //   postCreate: postCreateReducer,
  //   postReview: postReviewReducer,
  userRegistration: userResReducer,
  userSignin: userSigReducer,
  //   removeReview: removeReviewReducer,
  //   postLike: postLikeReducer,
  //   postUnlike: postUnlikeReducer,
  //   userForget: userForgetReducer,
  //   tokenVerify: tokenVerifyReducer,
  //   updatePassword: updatePasswordReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
