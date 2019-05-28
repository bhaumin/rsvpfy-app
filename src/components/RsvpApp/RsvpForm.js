import React from "react";

class RsvpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rsvpDetails: {
        guestName:
          props.currRsvpDetails && props.currRsvpDetails.guestName
            ? props.currRsvpDetails.guestName
            : ""
      }
    };

    if (props.eventDetails.hasNavkarshi) {
      this.state.rsvpDetails["navkarshiCount"] = props.currRsvpDetails
        ? props.currRsvpDetails.navkarshiCount
        : 0;
      this.state.rsvpDetails["navkarshiRedeemedCount"] = 0;
    }

    if (props.eventDetails.hasLunch) {
      this.state.rsvpDetails["lunchCount"] = props.currRsvpDetails
        ? props.currRsvpDetails.lunchCount
        : 0;
      this.state.rsvpDetails["lunchRedeemedCount"] = 0;
    }

    if (props.eventDetails.hasDinner) {
      this.state.rsvpDetails["dinnerCount"] = props.currRsvpDetails
        ? props.currRsvpDetails.dinnerCount
        : 0;
      this.state.rsvpDetails["dinnerRedeemedCount"] = 0;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static createSelectOptions = () => {
    const RSVP_MAX_GUESTS = 6;
    let selectOptions = [];

    for (let i = 0; i < RSVP_MAX_GUESTS; i++) {
      selectOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return selectOptions;
  };

  handleChange = event => {
    const value =
      event.target.type === "select-one"
        ? parseInt(event.target.value, 10)
        : event.target.value;

    this.setState({
      rsvpDetails: {
        ...this.state.rsvpDetails,
        [event.target.name]: value
      }
    });
  };

  handleSubmit = event => {
    // console.log("RSVP Form submitted.. ", this.props.eventDetails._id, this.state.rsvpDetails);
    event.preventDefault();
    this.props.onSubmit(this.props.eventDetails._id, this.state.rsvpDetails);
  };

  handleCancel = event => {
    // console.log("RSVP form cancelled.. ");
    event.preventDefault();
    this.props.onCancel();
  };

  render() {
    const { rsvpDetails } = this.state;

    const { eventDetails } = this.props;

    const selectOptions = this.constructor.createSelectOptions();

    return (
      <div>
        <h4>Event: {eventDetails.name}</h4>
        <p>{eventDetails.desc}</p>
        <p>Enter your details to RSVP</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-10">
            <label htmlFor="guestName">Name</label>
            <input
              className="form-control"
              type="text"
              name="guestName"
              value={rsvpDetails.guestName}
              onChange={this.handleChange}
            />
          </div>
          {eventDetails.hasNavkarshi && (
            <div className="form-group col-6">
              <label htmlFor="navkarshiCount">Navkarshi Count</label>
              <select
                className="form-control"
                name="navkarshiCount"
                value={rsvpDetails.navkarshiCount}
                onChange={this.handleChange}
              >
                {selectOptions}
              </select>
            </div>
          )}
          {eventDetails.hasLunch && (
            <div className="form-group col-6">
              <label htmlFor="lunchCount">Lunch Count</label>
              <select
                className="form-control"
                name="lunchCount"
                value={rsvpDetails.lunchCount}
                onChange={this.handleChange}
              >
                {selectOptions}
              </select>
            </div>
          )}
          {eventDetails.hasDinner && (
            <div className="form-group col-6">
              <label htmlFor="dinnerCount">Dinner Count</label>
              <select
                className="form-control"
                name="dinnerCount"
                value={rsvpDetails.dinnerCount}
                onChange={this.handleChange}
              >
                {selectOptions}
              </select>
            </div>
          )}
          <div className="btn-toolbar">
            <div className="btn-group mr-2">
              <button key="save" type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
            <div className="btn-group mr-2">
              <button
                key="cancel"
                className="btn btn-secondary"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default RsvpForm;
