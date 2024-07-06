import axios from "../axios";

const createNewShowtimeService = (data) => {
	return axios.post("/api/create-new-showtime", data);
};

const getShowtimeByCinemaService = (name) => {
	return axios.get(`/api/get-showtime-by-cinema?name=${name}`);
};

const getSeatsByShowtimeService = (data) => {
	return axios.post("/api/get-seats-by-showtime", data);
};

const getShowtimeByCinemaAndDateService = (name, date) => {
	return axios.get(
		`/api/get-showtime-by-cinema-and-date?name=${name}&date=${date}`
	);
};

const getShowtimeByCinemaAndDateAndMovieService = (
	tradeMark,
	date,
	nameMovie
) => {
	return axios.get(
		`/api/get-showtime-by-movie-and-date-and-trademark?nameMovie=${nameMovie}&tradeMarkSelected=${tradeMark}&dateSelected=${date}`
	);
};

export {
	createNewShowtimeService,
	getShowtimeByCinemaService,
	getSeatsByShowtimeService,
	getShowtimeByCinemaAndDateService,
	getShowtimeByCinemaAndDateAndMovieService,
};
