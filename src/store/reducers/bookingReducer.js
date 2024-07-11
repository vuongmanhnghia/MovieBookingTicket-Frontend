import actionTypes from "../actions/actionTypes";

const initialState = {
	totalBooking: 0,
	createBookingStatus: "",
	bookingSeats: {
		seat: [],
		numberSeat: [],
	},
};

const bookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.CREATE_NEW_BOOKING_SUCCESS:
			state.createBookingStatus = action.createBookingStatus;
			return {
				...state,
			};

		case actionTypes.CREATE_NEW_BOOKING_FAILED:
			state.createBookingStatus = action.createBookingStatus;
			return {
				...state,
			};

		case actionTypes.RESET_BOOKING:
			state.createBookingStatus = "";
			return {
				...state,
			};

		case actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_SUCCESS:
			state.totalBooking = action.totalBooking.totalBooking;
			return {
				...state,
			};

		case actionTypes.FETCH_BOOKING_BY_CINEMA_MOVIE_SCREEN_DATETIME_FAILED:
			return {
				...state,
			};

		case actionTypes.FETCH_BOOKING_SEATS_SUCCESS:
			state.bookingSeats = action.bookingSeats;
			return {
				...state,
			};

		case actionTypes.FETCH_BOOKING_SEATS_FAILED:
			return {
				...state,
			};

		default:
			return state;
	}
};

export default bookingReducer;
