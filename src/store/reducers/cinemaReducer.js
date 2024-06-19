import actionTypes from "../actions/actionTypes";

const initialState = {
	allCinemas: [],
	allTradeMarks: [],
	allCinemasByTradeMark: [],
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

		case actionTypes.CREATE_CINEMA_SUCCESS:
			state.allCinemas.push(action.newCinema);
			return {
				...state,
			};

		case actionTypes.CREATE_CINEMA_FAILED:
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_TRADEMARKS_SUCCESS:
			state.allTradeMarks = action.allTradeMarks;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_TRADEMARKS_FAILED:
			state.allTradeMaks = [];
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_CINEMAS_BY_TRADEMARK_SUCCESS:
			state.allCinemasByTradeMark = action.allCinemasByTradeMark;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_CINEMAS_BY_TRADEMARK_FAILED:
			state.allCinemasByTradeMark = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default cinemaReducer;
