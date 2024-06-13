import actionTypes from "./actionTypes";
import {
	createNewCinemaService,
	getAllCinemasService,
} from "../../services/cinemaService";
import { toast } from "react-toastify";

export const createNewCinema = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewCinemaService(data);
			if (response && response.errCode === 0) {
				dispatch(createCinemaSuccess());
				// dispatch(fetchAllCinemaStart());
				toast.success("Thêm mới bộ phim thành công!");
			} else {
				toast.error("Thêm mới bộ phim thất bại!");
				dispatch(createCinemaFailed());
			}
		} catch (e) {
			toast.error("Thêm mới bộ phim thất bại!");
			dispatch(createCinemaFailed());
			console.log("Create user errol: ", e);
		}
	};
};

export const createCinemaSuccess = () => ({
	type: actionTypes.CREATE_CINEMA_SUCCESS,
});

export const createCinemaFailed = () => ({
	type: actionTypes.CREATE_CINEMA_FAILED,
});

export const fetchAllCinemas = () => {
	return async (dispatch, getState) => {
		try {
			let response = await getAllCinemasService();
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALL_CINEMAS_SUCCESS,
					allCinemas: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALL_CINEMAS_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all Cinemas errol: ", e);
			dispatch({
				type: actionTypes.FETCH_ALL_CINEMAS_FAILED,
			});
		}
	};
};
