import actionTypes from "./actionTypes";
import {
	getTopMoviesService,
	createNewMovieService,
	getAllMoviesService,
	getDetailMovieService,
	getMoviesPageService,
	getReviewMoviesPageService,
	getAllMoviesSearchService,
} from "../../services/movieService";
import { toast } from "react-toastify";

export const fetchTopMovies = () => {
	return async (dispatch, getState) => {
		try {
			let res = await getTopMoviesService("");
			if (res && res.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_TOP_MOVIES_SUCCESS,
					topMovies: res.data,
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

export const fetchAllMovies = () => {
	return async (dispatch, getState) => {
		try {
			let response = await getAllMoviesService();
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
					allMovies: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALL_MOVIES_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all movies errol: ", e);
			dispatch({
				type: actionTypes.FETCH_ALL_MOVIES_FAILED,
			});
		}
	};
};

export const fetchDetailMovie = (id) => {
	return async (dispatch, getState) => {
		try {
			let response = await getDetailMovieService(id);
			console.log("fetch detail movie: ", response);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_DETAIL_MOVIE_SUCCESS,
					detailMovie: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_DETAIL_MOVIE_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch detail movie errol: ", e);
			dispatch({
				type: actionTypes.FETCH_DETAIL_MOVIE_FAILED,
			});
		}
	};
};

export const fetchMoviesPage = (page, limit) => {
	return async (dispatch, getState) => {
		try {
			let response = await getMoviesPageService(page, limit);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_MOVIES_PAGE_SUCCESS,
					moviesPage: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_MOVIES_PAGE_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch movies page errol: ", e);
			dispatch({
				type: actionTypes.FETCH_MOVIES_PAGE_FAILED,
			});
		}
	};
};

export const fetchReviewMoviesPage = (page, limit) => {
	return async (dispatch, getState) => {
		try {
			let response = await getReviewMoviesPageService(page, limit);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_REVIEW_MOVIES_PAGE_SUCCESS,
					reviewMoviesPage: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_REVIEW_MOVIES_PAGE_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch review movies page errol: ", e);
			dispatch({
				type: actionTypes.FETCH_REVIEW_MOVIES_PAGE_FAILED,
			});
		}
	};
};

export const fetchAllMoviesSearch = (keyword) => {
	return async (dispatch, getState) => {
		try {
			let response = await getAllMoviesSearchService(keyword);
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALL_MOVIES_SEARCH_SUCCESS,
					allMoviesSearch: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALL_MOVIES_SEARCH_FAILED,
				});
			}
		} catch (e) {
			console.log("fetch all movies search errol: ", e);
			dispatch({
				type: actionTypes.FETCH_ALL_MOVIES_SEARCH_FAILED,
			});
		}
	};
};
