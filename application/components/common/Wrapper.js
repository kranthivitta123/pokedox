import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../../pages/Home";
import Layout from "./Layout";

const Wrapper = (props) => {
  return (
    <div>
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </Layout>
    </div>
  );
};

export default Wrapper;
