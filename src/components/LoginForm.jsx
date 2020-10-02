import React from "react";
import Form from "./Common/Form";
import Joi from "joi-browser";
import userService from "../services/userService";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import { Animated } from "react-animated-css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data: token } = await userService.login(this.state.data);
      auth.saveToken(token);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <Animated
        animationIn="fadeInUp"
        animationOut="fadeOut"
        animationInDuration={350}
        animationOutDuration={350}
        isVisible={true}
      >
        <React.Fragment>
          <form onSubmit={this.handleSubmit} className="mt-5">
            {this.renderInput("text", "username", "Username:")}
            {this.renderInput("password", "password", "Password:")}
            {this.renderSubmitButton("Login")}
          </form>
        </React.Fragment>
      </Animated>
    );
  }
}

export default LoginForm;
