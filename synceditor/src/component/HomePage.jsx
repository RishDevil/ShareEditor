import React, { useState, useEffect } from "react";

import "./HomePage.css";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const HomePage = () => {
  const history = useHistory();
  const create = () => {
    localStorage.setItem("doc-user", name);
    history.push("/create/" + name);
  };
  const [name, setname] = useState("");

  return (
    <>
      <div className="container">
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Participant name"
        />

        <div className="button" onClick={() => create()}>
          <span className="shadow"></span>
          <div className="front"> create and open</div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
