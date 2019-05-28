import React from "react";
import FontAwesome from "react-fontawesome";

const EventRsvpSummary = props => {
  return (
    <div>
      <FontAwesome name="check" />
      <span className="small text-muted">RSVP Done {props.summary}</span>
    </div>
  );
};

const SelectEventRow = props => {
  const headerText = props.isTodays ? "Today's events" : "Upcoming Events";
  const buttonClasses = props.isTodays
    ? "btn btn-primary"
    : "btn btn-secondary";

  return (
    <div>
      {props.eventsToDisplay.length > 0 && (
        <div>
          <h5>{headerText}</h5>
          <ul>
            {props.eventsToDisplay.map(event => (
              <li key={event._id}>
                <button
                  key={event._id}
                  className={buttonClasses}
                  onClick={() => props.onClick(event._id)}
                >
                  {event.name}
                </button>
                {props.isEventRsvped(event._id) && (
                  <EventRsvpSummary
                    summary={props.getRsvpCountSummary(event._id)}
                  />
                )}
              </li>
            ))}
          </ul>
          <br />
        </div>
      )}
    </div>
  );
};

const SelectEvent = props => {
  const now = new Date();

  const isValidDate = d => {
    return d instanceof Date && !isNaN(d.valueOf());
  };

  const createDateOnly = d => {
    return isValidDate(d)
      ? new Date(d.getFullYear(), d.getMonth(), d.getDate())
      : null;
  };

  const cleanEventDate = eventDate => {
    return createDateOnly(convertToDateObj(eventDate));
  };

  const todaysDate = createDateOnly(now);
  const convertToDateObj = dtStr => {
    return new Date(dtStr);
  };

  const isTodaysEvent = eventDate =>
    eventDate && todaysDate && eventDate.valueOf() === todaysDate.valueOf();

  const isUpcomingEvent = eventDate =>
    eventDate && todaysDate && eventDate.valueOf() > todaysDate.valueOf();

  const todaysEvents = props.allEvents.filter(event =>
    isTodaysEvent(cleanEventDate(event.date))
  );
  const upcomingEvents = props.allEvents.filter(event =>
    isUpcomingEvent(cleanEventDate(event.date))
  );

  const isEventRsvped = eventId => {
    return (
      props.rsvpedEvents &&
      eventId in props.rsvpedEvents &&
      props.rsvpedEvents[eventId]
    );
  };

  const getRsvpCountSummary = eventId => {
    let summaries = [];
    const event = isEventRsvped(eventId) ? props.rsvpedEvents[eventId] : null;

    if (event && "navkarshiCount" in event) {
      summaries.push("Navkarshi: " + event.navkarshiCount);
    }
    if (event && "lunchCount" in event) {
      summaries.push("Lunch: " + event.lunchCount);
    }
    if (event && "dinnerCount" in event) {
      summaries.push("Dinner: " + event.dinnerCount);
    }

    return "(" + summaries.join(", ") + ")";
  };

  return (
    <div>
      <h4>Select Event</h4>
      <br />
      {todaysEvents.length === 0 &&
        upcomingEvents.length === 0 && <p>No events!</p>}

      <SelectEventRow
        eventsToDisplay={todaysEvents}
        getRsvpCountSummary={getRsvpCountSummary}
        isEventRsvped={isEventRsvped}
        isTodays={true}
        onClick={props.onClick}
      />

      <SelectEventRow
        eventsToDisplay={upcomingEvents}
        getRsvpCountSummary={getRsvpCountSummary}
        isEventRsvped={isEventRsvped}
        isTodays={false}
        onClick={props.onClick}
      />

      <hr />
      <button className="btn btn-secondary" onClick={props.onClickHome}>
        Home
      </button>
    </div>
  );
};

export default SelectEvent;
