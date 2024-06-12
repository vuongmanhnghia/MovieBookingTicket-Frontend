import axios from "../axios";

const getTopMoviesService = (limit) => {
	return axios.get(`/api/get-top-movies?limit=${limit}`);
};

const createNewMovieService = (data) => {
	return axios.post("/api/create-new-movie", data);
};

export { getTopMoviesService, createNewMovieService };
