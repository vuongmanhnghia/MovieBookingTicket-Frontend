import actionTypes from "../actions/actionTypes";

const initialState = {
	totalBooking: 0,
};

const bookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_SUCCESS:
			state.totalBooking = action.totalBooking.totalBooking;
			return {
				...state,
			};

		case actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_FAILED:
			return {
				...state,
			};

		default:
			return state;
	}
};

export default bookingReducer;
