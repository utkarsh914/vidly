import { getGenre } from "./fakeGenres";

const movies = [
  {
    _id: "1",
    title: "Terminator",
    price: 230,
    genre: { _id: "1", name: "Action" },
  },
  {
    _id: "2",
    title: "Fallen apart",
    price: 220,
    genre: { _id: "1", name: "Action" },
  },
  {
    _id: "3",
    title: "Backstreet boys",
    price: 210,
    genre: { _id: "1", name: "Action" },
  },
  {
    _id: "4",
    title: "In the name of love",
    price: 280,
    genre: { _id: "3", name: "Romance" },
  },
  {
    _id: "5",
    title: "Forrest Gump",
    price: 250,
    genre: { _id: "1", name: "Action" },
  },
  {
    _id: "6",
    title: "Inception",
    price: 330,
    genre: { _id: "2", name: "Thriller" },
  },
  {
    _id: "7",
    title: "Andhadhun",
    price: 430,
    genre: { _id: "2", name: "Thriller" },
  },
  {
    _id: "8",
    title: "Fault in our stars",
    price: 310,
    genre: { _id: "3", name: "Romance" },
  },
  {
    _id: "9",
    title: "Five feet apart",
    price: 530,
    genre: { _id: "3", name: "Romance" },
  },
];

const getMovies = () => {
  return movies;
};

const getMovie = (_id) => {
  if (!_id) return null;
  _id = _id.toString();
  return movies.find((m) => m._id === _id);
};

const saveMovie = (movie) => {
  const movieInDb = getMovie(movie._id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = getGenre(movie.genreId);
  movieInDb.price = parseInt(movie.price);

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
};

export { getMovies, getMovie, saveMovie };
