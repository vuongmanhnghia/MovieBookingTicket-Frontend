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

const getDetailMovieService = (nameMovie) => {
	return axios.get(`/api/get-detail-movie?name=${nameMovie}`);
};

const getMoviesPageService = (page, limit) => {
	return axios.get(`/api/get-movies?page=${page}&limit=${limit}`);
};

const getReviewMoviesPageService = (page, limit) => {
	return axios.get(`/api/get-review-movies?page=${page}&limit=${limit}`);
};

const getAllMoviesSearchService = (keyword) => {
	return axios.get(`/api/get-all-movies-search?keyword=${keyword}`);
};

export {
	getTopMoviesService,
	createNewMovieService,
	getDetailMovieService,
	getAllMoviesService,
	getMoviesPageService,
	getReviewMoviesPageService,
	getAllMoviesSearchService,
};
