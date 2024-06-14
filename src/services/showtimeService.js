import axios from "../axios";

const createNewShowtimeService = (data) => {
	return axios.post("/api/create-new-showtime", data);
};

// const getAllShowtimesService = () => {
// 	return axios.get("/api/get-all-showtimes");
// };

// const getDetailShowtimeService = (id) => {
// 	return axios.get(`/api/get-detail-showtime?id=${id}`);
// };

export {
	createNewShowtimeService,
	// getDetailShowtimeService,
	// getAllShowtimesService,
};
