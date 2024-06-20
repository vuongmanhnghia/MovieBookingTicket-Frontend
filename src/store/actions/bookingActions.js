import actionTypes from "./actionTypes";
import {
	createNewBookingService,
	// getAllBookingsService,
	// getAllTradeMarksService,
	// getAllBookingsByTradeMarkService,
} from "../../services/bookingService";
import { toast } from "react-toastify";

export const createNewBooking = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewBookingService(data);
			if (response && response.errCode === 0) {
				dispatch(createBookingSuccess());
				toast.success("Thêm mới bộ phim thành công!");
			} else {
				toast.error("Thêm mới bộ phim thất bại!");
				dispatch(createBookingFailed());
			}
		} catch (e) {
			toast.error("Thêm mới bộ phim thất bại!");
			dispatch(createBookingFailed());
			console.log("Create user errol: ", e);
		}
	};
};

export const createBookingSuccess = () => ({
	type: actionTypes.CREATE_BOOKING_SUCCESS,
});

export const createBookingFailed = () => ({
	type: actionTypes.CREATE_BOOKING_FAILED,
});

// export const fetchAllBookings = () => {
// 	return async (dispatch, getState) => {
// 		try {
// 			let response = await getAllBookingsService();
// 			if (response && response.errCode === 0) {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_BOOKINGS_SUCCESS,
// 					allBookings: response.data,
// 				});
// 			} else {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_BOOKINGS_FAILED,
// 				});
// 			}
// 		} catch (e) {
// 			console.log("fetch all Bookings errol: ", e);
// 			dispatch({
// 				type: actionTypes.FETCH_ALL_BOOKINGS_FAILED,
// 			});
// 		}
// 	};
// };

// export const fetchAllTradeMarks = () => {
// 	return async (dispatch, getState) => {
// 		try {
// 			let response = await getAllTradeMarksService();
// 			if (response && response.errCode === 0) {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_TRADEMARKS_SUCCESS,
// 					allTradeMarks: response.data,
// 				});
// 			} else {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_TRADEMARKS_FAILED,
// 				});
// 			}
// 		} catch (e) {
// 			console.log("fetch all TradeMarks errol: ", e);
// 			dispatch({
// 				type: actionTypes.FETCH_ALL_TRADEMARKS_FAILED,
// 			});
// 		}
// 	};
// };

// export const fetchAllBookingsByTradeMark = (data) => {
// 	return async (dispatch, getState) => {
// 		try {
// 			let response = await getAllBookingsByTradeMarkService(data);
// 			if (response && response.errCode === 0) {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_BOOKINGS_BY_TRADEMARK_SUCCESS,
// 					allBookingsByTradeMark: response.data,
// 				});
// 			} else {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_BOOKINGS_BY_TRADEMARK_FAILED,
// 				});
// 			}
// 		} catch (e) {
// 			console.log("fetch all TradeMarks errol: ", e);
// 			dispatch({
// 				type: actionTypes.FETCH_ALL_BOOKINGS_BY_TRADEMARK_FAILED,
// 			});
// 		}
// 	};
// };
