import actionTypes from "./actionTypes";

import {
	getBookingByCinemaMovieScreenDateTimeService,
	createNewBookingService,
	createNewBookingSeatService,
	getBookingSeatsService,
} from "../../services/bookingService";
import { toast } from "react-toastify";

export const createNewBooking = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewBookingService(data);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.CREATE_NEW_BOOKING_SUCCESS,
					createBookingStatus: response.errCode,
				});
			} else if (response.errCode === 3) {
				toast.error("Email không tồn tại!");
				dispatch({
					type: actionTypes.CREATE_NEW_BOOKING_FAILED,
					createBookingStatus: response.errCode,
				});
			} else {
				toast.error("Đặt vé thất bại!");
				dispatch({
					type: actionTypes.CREATE_NEW_BOOKING_FAILED,
					createBookingStatus: response.errCode,
				});
			}
		} catch (e) {
			toast.error("Đặt vé thất bại!");
			dispatch({
				type: actionTypes.CREATE_NEW_BOOKING_FAILED,
			});
			console.log("Create user errol: ", e);
		}
	};
};

export const createNewBookingSeat = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewBookingSeatService(data);
			if (response && response.errCode === 0) {
				toast.success("Đặt vé thành công!");
				dispatch({ type: actionTypes.CREATE_NEW_BOOKING_SEAT_SUCCESS });
			} else if (response.errCode === 3) {
				toast.error("Email không tồn tại!");
				dispatch({ type: actionTypes.CREATE_NEW_BOOKING_SEAT_FAILED });
			} else {
				toast.error("Đặt vé thất bại!");
				dispatch({ type: actionTypes.CREATE_NEW_BOOKING_SEAT_FAILED });
			}
		} catch (e) {
			toast.error("Đặt vé thất bại!");
			dispatch({ type: actionTypes.CREATE_NEW_BOOKING_SEAT_FAILED });
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

export const resetBooking = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: actionTypes.RESET_BOOKING,
		});
	};
};

export const fetchBookingSeats = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await getBookingSeatsService(data);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_BOOKING_SEATS_SUCCESS,
					bookingSeats: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_BOOKING_SEATS_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all Booking errol: ", e);
			dispatch({
				type: actionTypes.FETCH_BOOKING_SEATS_FAILED,
			});
		}
	};
};
