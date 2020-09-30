import React from "react";
import Form from "./Common/Form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().min(6).required().label("Password"),
  };

  doSubmit = (e) => {
    console.log("Submitted");
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="mt-5">
          {this.renderInput("text", "name", "Name:")}
          {this.renderInput("text", "username", "Username:")}
          {this.renderInput("password", "password", "Password:")}
          {this.renderSubmitButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
