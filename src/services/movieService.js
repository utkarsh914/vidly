import http from "./httpService";

const endPoint = `/movies`;

export const getMovies = async () => {
  return http.get(endPoint);
};

export const getMovie = async (_id) => {
  if (!_id) return { data: null };
  return http.get(`${endPoint}/${_id}`);
};

export const saveMovie = async (movie) => {
  let { data: movieInDb } = await getMovie(movie._id);
  if (!movieInDb) movieInDb = {};
  movieInDb.title = movie.title;
  movieInDb.genre = movie.genre;
  movieInDb.price = parseInt(movie.price);

  if (!movieInDb._id) {
    return addNewMovie(movieInDb);
  } else {
    return updateMovie(movieInDb);
  }
};

const addNewMovie = async (movie) => {
  return http.post(endPoint, movie);
};

const updateMovie = async (movie) => {
  return http.patch(endPoint, movie);
};

export const deleteMovie = async (_id) => {
  return http.delete(`${endPoint}/${_id}`);
};

export default { getMovies, getMovie, saveMovie, deleteMovie };
