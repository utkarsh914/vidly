import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router-dom";
import auth from "./services/authService";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Logout from "./components/Common/Logout";
import Customers from "./components/Customers";
import Movies from "./components/Movies";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import Rentals from "./components/Rentals";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch {}
  }

  render() {
    const user = this.state.user;
    return (
      <React.Fragment>
        <NavigationBar user={user} />
        <ToastContainer />
        <div className="container">
          <Switch>
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies user={user} {...props} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/logout" component={Logout} />
            <Redirect from="/" to="/movies" exact component={Movies} />
            <Route path="/" component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
