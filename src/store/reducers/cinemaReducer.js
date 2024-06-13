import actionTypes from "../actions/actionTypes";

const initialState = {
	allCinemas: [],
};

const cinemaReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_CINEMAS_SUCCESS:
			state.allCinemas = action.allCinemas;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_CINEMAS_FAILED:
			state.allCinemas = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default cinemaReducer;
