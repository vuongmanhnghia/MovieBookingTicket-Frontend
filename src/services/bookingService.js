import axios from "../axios";

const createNewBookingService = (data) => {
	return axios.post("/api/create-new-booking", data);
};

const getBookingByCinemaMovieScreenDateTimeService = (data) => {
	return axios.post("/api/get-booking-by-cinema-movie-screen-date-time", data);
};

export {
	createNewBookingService,
	getBookingByCinemaMovieScreenDateTimeService,
};
