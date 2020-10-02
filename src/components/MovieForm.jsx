import React from "react";
import Form from "./Common/Form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
      genre: "",
      title: "",
      price: "100",
    },
    genres: [],
    errors: {},
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  populateGenres = async () => {
    const { data: gotGenres } = await getGenres();
    this.setState({ genres: gotGenres });
  };

  populateMovies = async () => {
    const movieId = this.props.match.params.id;
    if (movieId === "add") return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      genre: movie.genre._id,
      title: movie.title,
      price: movie.price,
    };
  };

  schema = {
    _id: Joi.string().label("Movie ID"),
    title: Joi.string().required().label("Movie Title"),
    price: Joi.number().min(100).max(1000).required().label("Price"),
    genre: Joi.string().required().label("Genre ID"),
  };

  doSubmit = async () => {
    console.log("Submitted");
    await saveMovie(this.state.data);
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
          {this.renderSelect("genre", "Select genre", this.state.genres)}
          {this.renderSubmitButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
