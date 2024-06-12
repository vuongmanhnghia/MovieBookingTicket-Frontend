import axios from "../axios";

const getTopMoviesService = (limit) => {
	return axios.get(`/api/get-top-movies?limit=${limit}`);
};

const createNewMovieService = (data) => {
	return axios.post("/api/create-new-movie", data);
};

const getAllMoviesService = () => {
	return axios.get("/api/get-all-movies");
};

const getDetailMovieService = (id) => {
	return axios.get(`/api/get-detail-movie?id=${id}`);
};

export {
	getTopMoviesService,
	createNewMovieService,
	getDetailMovieService,
	getAllMoviesService,
};
