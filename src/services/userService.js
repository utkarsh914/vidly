import http from "./httpService";

const endPoint = `/users`;

const register = async (user) => {
  const body = {
    name: user.name,
    email: user.username,
    password: user.password,
  };
  return http.post(`${endPoint}/register`, body);
};

const login = async (user) => {
  const body = {
    email: user.username,
    password: user.password,
  };
  return http.post(`${endPoint}/login`, body);
};

export default { register, login };
