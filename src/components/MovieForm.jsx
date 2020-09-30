import React from "react";
import Form from "./Common/Form";
import Joi from "joi-browser";
import { getGenres } from "../Constants/fakeGenres";
import { getMovie, saveMovie } from "../Constants/fakeMovies";

class MovieForm extends Form {
  state = {
    data: {
      // _id: "",
      genreId: "",
      title: "",
      price: "100",
    },
    genres: [],
    errors: {},
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });

    const movieId = this.props.match.params.id;
    if (movieId === "add") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      genreId: movie.genre._id,
      title: movie.title,
      price: movie.price,
    };
  };

  schema = {
    _id: Joi.string().label("Movie ID"),
    title: Joi.string().required().label("Movie Title"),
    price: Joi.number().min(100).max(1000).required().label("Price"),
    genreId: Joi.string().required().label("Genre ID"),
  };

  doSubmit = () => {
    console.log("Submitted");
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  handleSelectChange = (e) => {
    console.log(e);
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="mt-5">
          {this.renderInput("text", "title", "Movie Title:")}
          {this.renderInput("number", "price", "Price per unit:")}
          {this.renderSelect("genreId", "Select genre", this.state.genres)}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
