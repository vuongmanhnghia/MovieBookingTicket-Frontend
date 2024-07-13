import actionTypes from "../actions/actionTypes";

const initialState = {
	allShowtimes: [],
	seatsByShowtime: [],
	showtimesByCDM: [],
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

		case actionTypes.FETCH_SEATS_BY_SHOWTIME_SUCCESS:
			state.seatsByShowtime = action.seats;
			return {
				...state,
			};

		case actionTypes.FETCH_SEATS_BY_SHOWTIME_FAILED:
			state.seatsByShowtime = [];
			return {
				...state,
			};

		case actionTypes.FETCH_SHOWTIME_BY_CINEMA_AND_DATE_AND_MOVIE_SUCCESS:
			state.showtimesByCDM = action.showtimesByCDM;
			return {
				...state,
			};

		case actionTypes.FETCH_SHOWTIME_BY_CINEMA_AND_DATE_AND_MOVIE_FAILED:
			state.showtimesByCDM = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default showtimeReducer;
