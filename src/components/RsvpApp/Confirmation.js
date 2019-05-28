import React from "react";
import _ from "lodash";
import QRCode from "qrcode.react";

const ToggleButton = props => {
  const countVarName = props.mealType + "Count";
  const getButtonClasses = () => {
    let classes = ["btn", "btn-sm"];

    props.isActive
      ? classes.push("btn-primary")
      : classes.push("btn-secondary");

    return classes.join(" ");
  };

  return (
    <div>
      {countVarName in props.currRsvpDetails &&
        props.canDisplay && (
          <div className="btn-group mr-2">
            <button
              className={getButtonClasses()}
              onClick={() => props.onToggleConfirmation(props.mealType)}
            >
              {_.capitalize(props.mealType)}
            </button>
          </div>
        )}
    </div>
  );
};

const ConfirmationCode = props => {
  const countVarName = props.mealType + "Count";
  const redeemedCountVarName = props.mealType + "RedeemedCount";

  return (
    <div>
      {countVarName in props.currRsvpDetails &&
        props.canDisplay && (
          <div>
            <h5>{_.capitalize(props.mealType)} Confirmation</h5>
            <Code
              email={props.email}
              mealType={props.mealType}
              totalCount={props.currRsvpDetails[countVarName]}
              redeemedCount={props.currRsvpDetails[redeemedCountVarName]}
            />
          </div>
        )}
    </div>
  );
};

const Code = props => {
  const codeKey = props.email + ":" + props.mealType;
  const remainingCount = props.totalCount - props.redeemedCount;
  return (
    <div>
      {remainingCount > 0 ? (
        <p>
          <QRCode value={codeKey} />
          <br />
          (redeemed: {props.redeemedCount} of {props.totalCount})
        </p>
      ) : (
        <p>All RSVP codes are redeemed!</p>
      )}
    </div>
  );
};

class Confirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDisplayNavkarshiConfirmation: true, // this.isTimeValidFor("navkarshi"),
      isDisplayLunchConfirmation: true, // this.isTimeValidFor("lunch"),
      isDisplayDinnerConfirmation: true // this.isTimeValidFor("dinner"),
    };
  }

  isTimeValidFor = type => {
    const currHour = new Date().getHours();
    const MEAL_TIMES = {
      navkarshi: [8, 10],
      lunch: [11, 15],
      dinner: [17, 20]
    };

    return currHour >= MEAL_TIMES[type][0] && currHour < MEAL_TIMES[type][1];
  };

  canDisplayConfirmation = type => {
    const flagVarName = "isDisplay" + _.capitalize(type) + "Confirmation";
    return this.state[flagVarName];
  };

  canDisplayToggleButton = type => {
    let hasTimePassed = false;
    if (type === "navkarshi") {
      hasTimePassed = false; // this.isTimeValidFor("lunch") || this.isTimeValidFor("dinner");
    } else if (type === "lunch") {
      hasTimePassed = false;
      this.isTimeValidFor("dinner");
    }

    return !hasTimePassed;
  };

  handleToggleConfirmation = type => {
    const flagVarName = "isDisplay" + _.capitalize(type) + "Confirmation";

    this.setState({
      [flagVarName]: !this.canDisplayConfirmation(type)
    });
  };

  render() {
    return (
      <div className="Confirmation">
        <div className="btn-toolbar justify-content-center">
          {["navkarshi", "lunch", "dinner"].map(type => (
            <ToggleButton
              key={type}
              mealType={type}
              currRsvpDetails={this.props.currRsvpDetails}
              isActive={this.canDisplayConfirmation(type)}
              canDisplay={this.canDisplayToggleButton(type)}
              onToggleConfirmation={this.handleToggleConfirmation}
            />
          ))}
        </div>
        <br />
        <div>
          {["navkarshi", "lunch", "dinner"].map(type => (
            <ConfirmationCode
              key={type}
              mealType={type}
              currRsvpDetails={this.props.currRsvpDetails}
              canDisplay={this.canDisplayConfirmation(type)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Confirmation;
