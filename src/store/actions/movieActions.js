import actionTypes from "./actionTypes";
import {
	getTopMoviesService,
	createNewMovieService,
} from "../../services/movieService";
import { toast } from "react-toastify";

export const fetchTopMovies = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getTopMoviesService("");
			if (res && res.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_TOP_MOVIES_SUCCESS,
					dataMovies: res.data,
				});
			} else {
				console.log("fetch top movies failed");
				dispatch({
					type: actionTypes.FETCH_TOP_MOVIES_FAILED,
				});
			}
		} catch (e) {}
	};
};

export const createNewMovie = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await createNewMovieService(data);
			if (response && response.errCode === 0) {
				dispatch(createMovieSuccess());
				// dispatch(fetchAllMovieStart());
				toast.success("Thêm mới bộ phim thành công!");
			} else {
				toast.error("Thêm mới bộ phim thất bại!");
				dispatch(createMovieFailed());
			}
		} catch (e) {
			toast.error("Thêm mới bộ phim thất bại!");
			dispatch(createMovieFailed());
			console.log("Create user errol: ", e);
		}
	};
};

export const createMovieSuccess = () => ({
	type: actionTypes.CREATE_MOVIE_SUCCESS,
});

export const createMovieFailed = () => ({
	type: actionTypes.CREATE_MOVIE_FAILED,
});
