import React from "react";
import axios from "axios";
import SelectEvent from "./SelectEvent";
import SignInForm from "./SignInForm";
import RsvpForm from "./RsvpForm";
import Status from "./Status";
// import logo from "./logo.svg";
import "../../css/RsvpApp.css";

class Rsvp extends React.Component {
  constructor(props) {
    super(props);

    this.goToHomeHandler = this.goToHomeHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/rsvp/events")
      .then(res => {
        this.setState({
          allEvents: res.data,
          isSignedIn: true,
          email: "bhaumin.12@gmail.com"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  static initialState = () => ({
    allEvents: null,
    selectedEvent: null,
    rsvpedEvents: null,
    isSignedIn: false,
    email: null,
    editRsvp: false
  });

  state = Rsvp.initialState();

  goToHomeHandler = () => {
    this.props.onClick("MainMenu");
  };

  isSelectedEventRsvped = () => {
    return (
      this.state.rsvpedEvents &&
      this.state.selectedEvent &&
      this.state.rsvpedEvents[this.state.selectedEvent._id]
    );
  };

  getSelectedEventRsvpDetails = () => {
    // console.log(this.state.rsvpedEvents[this.state.selectedEvent._id]);
    return this.isSelectedEventRsvped()
      ? this.state.rsvpedEvents[this.state.selectedEvent._id]
      : null;
  };

  clearSelectedEvent = () => {
    this.setState({
      selectedEvent: null
    });
  };

  handleEventSelection = eventId => {
    let selectedEvent = this.state.allEvents.filter(event => {
      return event._id === eventId;
    });

    if (selectedEvent.length === 1) {
      this.setState({
        selectedEvent: selectedEvent[0]
      });
    }
  };

  handleSignInClick = email => {
    // console.log("In handleSignInClick..", email);
    if (email) {
      this.setState({
        email: email,
        isSignedIn: true
      });
    }
  };

  handleRsvpFormSubmit = (eventId, newRsvpDetails) => {
    this.setState({
      editRsvp: false,
      rsvpedEvents: {
        ...this.state.rsvpedEvents,
        [eventId]: newRsvpDetails
      }
    });
  };

  handleRsvpFormCancel = () => {
    if (this.state.editRsvp) {
      this.setState({
        editRsvp: false
      });
    } else {
      // clear selected event
      this.clearSelectedEvent();
    }
  };

  handleEditRsvpClick = () => {
    this.setState({
      editRsvp: true
    });
  };

  render() {
    const {
      allEvents,
      selectedEvent,
      isSignedIn,
      rsvpedEvents,
      email,
      editRsvp
    } = this.state;

    return (
      <div className="container">
        <h2>RSVP App</h2>
        <hr />
        {!isSignedIn ? (
          <SignInForm
            onSubmit={this.handleSignInClick}
            onCancel={this.goToHomeHandler}
          />
        ) : this.isSelectedEventRsvped() && !editRsvp ? (
          <Status
            email={email}
            currRsvpDetails={this.getSelectedEventRsvpDetails()}
            onEditRsvpClick={this.handleEditRsvpClick}
            onShowAllEvents={this.clearSelectedEvent}
          />
        ) : !selectedEvent ? (
          <SelectEvent
            allEvents={allEvents}
            rsvpedEvents={rsvpedEvents}
            onClick={this.handleEventSelection}
            onClickHome={this.goToHomeHandler}
          />
        ) : (
          <RsvpForm
            eventDetails={selectedEvent}
            currRsvpDetails={this.getSelectedEventRsvpDetails()}
            onSubmit={this.handleRsvpFormSubmit}
            onCancel={this.handleRsvpFormCancel}
          />
        )}
      </div>
    );
  }
}

export default Rsvp;
