import React from "react";
import Form from "./Common/Form";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = (e) => {
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="mt-5">
          {this.renderInput("text", "username", "Username:")}
          {this.renderInput("password", "password", "Password:")}
          {this.renderSubmitButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
