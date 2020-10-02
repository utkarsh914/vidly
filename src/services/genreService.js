import http from "./httpService";

const endPoint = `/genres`;

export const getGenres = async () => {
  return http.get(endPoint);
};

export const getGenre = async (_id) => {
  if (!_id) return { data: null };
  return http.get(`${endPoint}/${_id}`);
};

export default { getGenres, getGenre };
