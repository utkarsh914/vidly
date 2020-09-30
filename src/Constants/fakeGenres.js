const genres = [
  { _id: "1", name: "Action" },
  { _id: "2", name: "Thriller" },
  { _id: "3", name: "Romance" },
  { _id: "4", name: "Fiction" },
];

const getGenres = () => {
  return genres;
};

const getGenre = (_id) => {
  _id = _id.toString();
  return genres.find((g) => g._id === _id);
};

export { getGenres, getGenre };
