import React, { useState, useEffect, useHistory } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import "./auth.css";
import { signin, register } from "../action/userAction";
import { useSelector, useDispatch } from "react-redux";
const UserAuthenticate = ({ history }) => {
  const dispatch = useDispatch();

  ///////////////////// Selector
  const dataSignIn = useSelector((state) => state.userSignin);
  const dataReg = useSelector((state) => state.userRegistration);

  ///////////////////// USE STATES
  const [active, setactive] = useState(0);
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  ////////////////////////////////////////////////////////////////////
  console.log(dataSignIn);
  console.log(dataReg);

  ////////////////////////// change form
  const switchToRegister = () => {
    reset();
    setactive(1);
  };
  const switchToLogin = () => {
    reset();
    setactive(0);
  };

  ///////////////////////// reset fields

  const reset = () => {
    setEmail("");
    setuserName("");
    setPassword("");
    setRepeatPassword("");
  };
  ////////////////////////// login//////////////////

  const loginBtn = () => {
    if (email == "" && password == "") return;
    dispatch(signin(email, password));
  };

  ////////////////////////// Register//////////////////////
  const registerBtn = () => {
    if (email == "" && password == "" && userName == "" && repeatPassword == "")
      return;
    if (password != repeatPassword) return;

    dispatch(register(userName, email, password));
  };

  useEffect(async () => {
    if (dataReg.success) {
      reset();
      history.push("/doc");
    }
    if (dataSignIn.success) {
      console.log("succedd");
      reset();
      history.push("/doc");
    }
    console.log("not succed");
  }, [dataReg, dataSignIn]);

  return (
    <div className="main">
      <span className={`form `}>
        <div className="sign">
          <div className={active == 0 ? "signin active" : "signin"}>
            {!dataSignIn.loading ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="email"
                  className={active == 0 ? "activ" : "deactive"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div> {dataSignIn?.error?.email}</div>
                <input
                  type="password"
                  placeholder="password"
                  className={active == 0 ? "activ" : "deactive"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div> {dataSignIn?.error?.password}</div>
                <button
                  className={active == 0 ? "activ" : "deactive"}
                  onClick={loginBtn}
                >
                  signin
                </button>
              </>
            ) : (
              <div>loading...</div>
            )}
          </div>

          <div className="signBtn " onClick={switchToLogin}>
            {" "}
            signin form
          </div>
        </div>
        <div className="regis">
          <div className={active == 1 ? "register active" : "register"}>
            {!dataReg.loading ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="username"
                  className={active == 1 ? "activ" : "deactive"}
                  onChange={(e) => setuserName(e.target.value)}
                  value={userName}
                />
                <div> {dataReg?.error?.user}</div>
                <input
                  type="text"
                  placeholder="email"
                  className={active == 1 ? "activ" : "deactive"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div> {dataReg?.error?.email}</div>
                <input
                  type="password"
                  placeholder="password"
                  className={active == 1 ? "activ" : "deactive"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div> {dataReg?.error?.password}</div>
                <input
                  type="password"
                  placeholder="re-enter password"
                  className={active == 1 ? "activ" : "deactive"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button
                  className={active == 1 ? "activ" : "deactive"}
                  onClick={registerBtn}
                >
                  Register
                </button>
              </>
            ) : (
              <div>loading...</div>
            )}
          </div>
          <div className="regisBtn " onClick={switchToRegister}>
            {" "}
            register form
          </div>
        </div>
      </span>
    </div>
  );
};

export default UserAuthenticate;
