import actionTypes from "./actionTypes";
import {
	createNewScreenService,
	getAllScreensService,
} from "../../services/screenService";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

export const createNewScreen = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewScreenService(data);
			if (response && response.errCode === 0) {
				dispatch(createScreenSuccess());
				toast.success("Thêm mới bộ phim thành công!");
			} else {
				toast.error("Thêm mới bộ phim thất bại!");
				dispatch(createScreenFailed());
			}
		} catch (e) {
			toast.error("Thêm mới bộ phim thất bại!");
			dispatch(createScreenFailed());
			console.log("Create user errol: ", e);
		}
	};
};
export const createScreenSuccess = () => ({
	type: actionTypes.CREATE_SCREEN_SUCCESS,
});

export const createScreenFailed = () => ({
	type: actionTypes.CREATE_SCREEN_FAILED,
});

export const fetchAllScreens = (cinemaId) => {
	return async (dispatch, getState) => {
		try {
			let response = await getAllScreensService(cinemaId);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALL_SCREENS_SUCCESS,
					allScreens: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALL_SCREENS_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all screens errol: ", e);
			dispatch({
				type: actionTypes.FETCH_ALL_SCREENS_FAILED,
			});
		}
	};
};
