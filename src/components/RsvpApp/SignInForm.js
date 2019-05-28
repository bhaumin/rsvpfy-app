import React from "react";

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange = event => {
    this.setState({
      emailAddress: event.target.value
    });
  };

  handleSubmit = event => {
    // console.log("Sign In form was submitted: " + this.state.emailAddress);
    event.preventDefault();
    this.props.onSubmit(this.state.emailAddress);
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.onCancel();
  };

  render() {
    return (
      <div>
        <h4>Sign In</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="emailAddress"
              placeholder="Enter email"
              aria-describedby="emailHelp"
              value={this.state.emailAddress}
              onChange={this.handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Please enter your JCNC membership email address
            </small>
          </div>
          <div className="btn-toolbar">
            <div className="btn-group mr-2">
              <button key="signin" type="submit" className="btn btn-primary">
                Sign In
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

export default SignInForm;
