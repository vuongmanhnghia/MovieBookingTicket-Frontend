import actionTypes from "../actions/actionTypes";

const initialState = {};

const screenReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_SCREENS_SUCCESS:
			state.allMovies = action.allMovies;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_SCREENS_FAILED:
			state.allMovies = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default screenReducer;
