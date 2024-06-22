import axios from "../axios";

const createNewShowtimeService = (data) => {
	return axios.post("/api/create-new-showtime", data);
};

const getShowtimeByCinemaService = (name) => {
	return axios.get(`/api/get-showtime-by-cinema?name=${name}`);
};

// const getAllShowtimesService = () => {
// 	return axios.get("/api/get-all-showtimes");
// };

// const getDetailShowtimeService = (id) => {
// 	return axios.get(`/api/get-detail-showtime?id=${id}`);
// };

const getSeatsByShowtimeService = (data) => {
	return axios.post("/api/get-seats-by-showtime", data);
};

export {
	createNewShowtimeService,
	getShowtimeByCinemaService,
	getSeatsByShowtimeService,
	// getDetailShowtimeService,
	// getAllShowtimesService,
};
