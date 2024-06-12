import actionTypes from "../actions/actionTypes";

const initialState = {
	topMovies: [],
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_TOP_MOVIES_SUCCESS:
			state.topMovies = action.dataMovies;
			return {
				...state,
			};

		case actionTypes.FETCH_TOP_MOVIES_FAILED:
			state.topMovies = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default movieReducer;
