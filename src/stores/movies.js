import axios from "axios";
import { API_ROOT_URL } from "../Utils/constants";

export const fetchMovies = async () => {
  const response = await axios.get(`${API_ROOT_URL}/shows`);

  console.log("response", response);
  return response.data;
};

export const searchMovie = async (movie) => {
  let link = `${API_ROOT_URL}/singlesearch/shows?q=:${movie}`;
  return axios
    .get(link)
    .then((response) => {
      return response.data;
    })
    .catch(() => console.log("error"));
};
