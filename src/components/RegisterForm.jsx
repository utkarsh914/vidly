import React from "react";
import Form from "./Common/Form";
import Joi from "joi-browser";
import userService from "../services/userService";
import auth from "../services/authService";

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

  doSubmit = async () => {
    try {
      const { data: token } = await userService.register(this.state.data);
      auth.saveToken(token);
      window.location = "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
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
