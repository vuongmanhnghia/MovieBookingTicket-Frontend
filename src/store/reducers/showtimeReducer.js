import actionTypes from "../actions/actionTypes";

const initialState = {
	allShowtimes: [],
};

const showtimeReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_SHOWTIMES_SUCCESS:
			state.allShowtimes = action.allShowtimes;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_SHOWTIMES_FAILED:
			state.allShowtimes = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default showtimeReducer;
