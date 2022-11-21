import React, { useEffect } from "react";
import axios from "axios";
import Cookie from "js-cookie";
const Documents = (props) => {
  const user = Cookie.getJSON("userInfo");

  useEffect(async () => {
    if (!user) {
      props.history.push("/");
      return;
    }

    const { data } = await axios.get("http://localhost:4000/doc", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const { data: data1 } = await axios.get("http://localhost:4000/docInvite", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(data, " data");
    console.log(data1, "data1");
  }, []);
  return <div>docs</div>;
};

export default Documents;
