import actionTypes from "./actionTypes";
import {
	createNewShowtimeService,
	getSeatsByShowtimeService,
} from "../../services/showtimeService";
import { toast } from "react-toastify";

export const createNewShowtime = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewShowtimeService(data);
			if (response && response.errCode === 0) {
				dispatch(createShowtimeSuccess());
				// dispatch(fetchAllShowtimeStart());
				toast.success("Thêm mới lịch chiếu phim thành công!");
			} else {
				toast.error("Có lịch chiếu phim đã tồn tại!");
				dispatch(createShowtimeFailed());
			}
		} catch (e) {
			toast.error("Thêm mới lịch chiếu phim thất bại!");
			dispatch(createShowtimeFailed());
			console.log("Create user errol: ", e);
		}
	};
};

export const createShowtimeSuccess = () => ({
	type: actionTypes.CREATE_SHOWTIME_SUCCESS,
});

export const createShowtimeFailed = () => ({
	type: actionTypes.CREATE_SHOWTIME_FAILED,
});

export const fetchSeatsByShowtime = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await getSeatsByShowtimeService(data);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_SEATS_BY_SHOWTIME_SUCCESS,
					seats: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_SEATS_BY_SHOWTIME_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all showtimes errol: ", e);
			dispatch({
				type: actionTypes.FETCH_SEATS_BY_SHOWTIME_FAILED,
			});
		}
	};
};
