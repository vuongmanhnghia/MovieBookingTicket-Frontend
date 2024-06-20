import axios from "../axios";

const createNewBookingService = (data) => {
	return axios.post("/api/create-new-booking", data);
};

// const getAllBookingsService = () => {
// 	return axios.get("/api/get-all-bookings");
// };

// const getDetailBookingService = (id) => {
// 	return axios.get(`/api/get-detail-booking?id=${id}`);
// };

// const getAllTradeMarksService = () => {
// 	return axios.get("/api/get-all-trademarks");
// };

// const getAllBookingsByTradeMarkService = (tradeMark) => {
// 	return axios.get(
// 		`/api/get-all-bookings-by-trademark?tradeMark=${tradeMark}`
// 	);
// };

export {
	createNewBookingService,
	// getDetailBookingService,
	// getAllBookingsService,
	// getAllTradeMarksService,
	// getAllBookingsByTradeMarkService,
};
