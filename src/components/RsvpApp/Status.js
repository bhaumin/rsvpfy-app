import React from "react";
import Confirmation from "./Confirmation";

const Status = props => {
  return (
    <div className="Status">
      <h4>Status</h4>
      Here's your RSVP status summary
      <br />
      <br />
      <Confirmation
        email={props.email}
        currRsvpDetails={props.currRsvpDetails}
      />
      <br />
      <button className="btn btn-secondary" onClick={props.onEditRsvpClick}>
        Edit RSVP Details
      </button>
      <br />
      <br />
      <button className="btn btn-secondary" onClick={props.onShowAllEvents}>
        All Events
      </button>
    </div>
  );
};

export default Status;
