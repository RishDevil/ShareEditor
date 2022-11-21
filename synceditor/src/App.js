import logo from "./logo.svg";

import "tailwindcss/tailwind.css";

import { useCallback, useEffect, useRef } from "react";
import TextEditor from "./component/TextEditor";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import HomePage from "./component/HomePage";
import User from "./component/UserAuthenticate";
import Documents from "./component/Documents";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={User}></Route>
        <Route exact path="/doc" component={Documents}></Route>
        <Route exact path="/create" component={HomePage}></Route>
        <Route
          exact
          path="/create/:name"
          render={(props) => (
            <Redirect
              to={{
                pathname: `/document/${
                  props.match.params.name.split("@")[0] + "-" + uuidv4()
                }`,
                search: `last=${props.match.params.name.split("@")[1]}`,
              }}
            ></Redirect>
          )}
        ></Route>
        <Route exact path="/document/:id">
          <TextEditor></TextEditor>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
