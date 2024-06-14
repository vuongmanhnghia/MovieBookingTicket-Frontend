import actionTypes from "./actionTypes";
import {
	createNewShowtimeService,
	// getAllShowtimesService,
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
				toast.error("Thêm mới lịch chiếu phim thất bại!");
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

// export const fetchAllShowtimes = () => {
// 	return async (dispatch, getState) => {
// 		try {
// 			let response = await getAllShowtimesService();
// 			if (response && response.errCode === 0) {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_SHOWTIMES_SUCCESS,
// 					allShowtimes: response.data,
// 				});
// 			} else {
// 				dispatch({
// 					type: actionTypes.FETCH_ALL_SHOWTIMES_FAILED,
// 				});
// 			}
// 		} catch (e) {
// 			console.log("fetch all showtimes errol: ", e);
// 			dispatch({
// 				type: actionTypes.FETCH_ALL_SHOWTIMES_FAILED,
// 			});
// 		}
// 	};
// };
