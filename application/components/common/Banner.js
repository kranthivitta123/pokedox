import React, { Fragment } from "react";

const Banner = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12 col-lg-6 col-12">
          <div className="row" tabIndex="0">
            <div className="borders col-3 col-md-12 col-lg-3">
              <h5 className="m-0">
                <b>Pokédex</b>
              </h5>
            </div>
            <div className="col-md-12 col-lg-9">
              <p className="m-0 border-pok">
                Search for any Pokémon that exists on the planet
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Banner;
