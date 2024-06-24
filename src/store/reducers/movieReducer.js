import actionTypes from "../actions/actionTypes";

const initialState = {
	topMovies: [],
	allMovies: [],
	detailMovie: {},
	moviesPage: [],
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_TOP_MOVIES_SUCCESS:
			state.topMovies = action.topMovies;
			return {
				...state,
			};

		case actionTypes.FETCH_TOP_MOVIES_FAILED:
			state.topMovies = [];
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
			state.allMovies = action.allMovies;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_MOVIES_FAILED:
			state.allMovies = [];
			return {
				...state,
			};

		case actionTypes.FETCH_DETAIL_MOVIE_SUCCESS:
			state.detailMovie = action.detailMovie;
			return {
				...state,
			};

		case actionTypes.FETCH_DETAIL_MOVIE_FAILED:
			state.detailMovie = {};
			return {
				...state,
			};

		case actionTypes.FETCH_MOVIES_PAGE_SUCCESS:
			state.moviesPage = action.moviesPage;
			return {
				...state,
			};

		case actionTypes.FETCH_MOVIES_PAGE_FAILED:
			state.moviesPage = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default movieReducer;
