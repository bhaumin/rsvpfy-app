import React from "react";

const MainMenu = props => {
  return (
    <div className="container">
      <h2>JCNC App</h2>
      <hr />
      <div className="row justify-content-center">
        <div className="col-8">
          <ul className="justify-content-center">
            <li key="rsvp">
              <button
                key="btn-rsvp"
                className="btn btn-block btn-primary"
                onClick={() => props.onClick("Rsvp")}
              >
                RSVP
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
