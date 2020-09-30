import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Customers from "./components/Customers";
import Movies from "./components/Movies";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import Rentals from "./components/Rentals";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Redirect from="/" to="/movies" exact component={Movies} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
