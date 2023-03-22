import React, { Fragment } from "react";

const Layout = (props) => {
  return (
    <div>
      <Fragment>
        <main>{props.children}</main>
      </Fragment>
    </div>
  );
};

export default Layout;
