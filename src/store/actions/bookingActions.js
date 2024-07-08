import actionTypes from "./actionTypes";

import {
	getBookingByCinemaMovieScreenDateTimeService,
	createNewBookingService,
} from "../../services/bookingService";
import { toast } from "react-toastify";

export const createNewBooking = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewBookingService(data);
			if (response && response.errCode === 0) {
				dispatch({ type: actionTypes.CREATE_NEW_BOOKING_SUCCESS });
				toast.success("Đặt vé thành công!");
			} else if (response.errCode === 3) {
				toast.error("Email không tồn tại!");
				dispatch({ type: actionTypes.CREATE_NEW_BOOKING_FAILED });
			} else {
				toast.error("Đặt vé thất bại!");
				dispatch({ type: actionTypes.CREATE_NEW_BOOKING_FAILED });
			}
		} catch (e) {
			toast.error("Đặt vé thất bại!");
			dispatch({ type: actionTypes.CREATE_NEW_BOOKING_FAILED });
			console.log("Create user errol: ", e);
		}
	};
};

export const fetchBookingByCinemaMovieScreenDateTime = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await getBookingByCinemaMovieScreenDateTimeService(
				data
			);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_SUCCESS,
					totalBooking: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all Booking errol: ", e);
			dispatch({
				type: actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_FAILED,
			});
		}
	};
};
