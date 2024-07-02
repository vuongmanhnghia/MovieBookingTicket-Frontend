import axios from "../axios";

const createNewCinemaService = (data) => {
	return axios.post("/api/create-new-cinema", data);
};

const getAllCinemasService = () => {
	return axios.get("/api/get-all-cinemas");
};

const getDetailCinemaService = (id) => {
	return axios.get(`/api/get-detail-cinema?id=${id}`);
};

const getAllTradeMarksService = () => {
	return axios.get("/api/get-all-trademarks");
};

const getAllCinemasByTradeMarkService = (tradeMark) => {
	return axios.get(`/api/get-all-cinemas-by-trademark?tradeMark=${tradeMark}`);
};

const getShowtimeByCinemaService = (name) => {
	return axios.get(`/api/get-showtime-by-cinema?name=${name}`);
};

const getTradeMarkByCinemaService = (name) => {
	return axios.get(`/api/get-tradeMark-by-cinema?name=${name}`);
};

export {
	createNewCinemaService,
	getDetailCinemaService,
	getAllCinemasService,
	getAllTradeMarksService,
	getAllCinemasByTradeMarkService,
	getShowtimeByCinemaService,
	getTradeMarkByCinemaService,
};
