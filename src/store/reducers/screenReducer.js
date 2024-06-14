import actionTypes from "../actions/actionTypes";

const initialState = {
	allScreens: [],
};

const screenReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_ALL_SCREENS_SUCCESS:
			state.allScreens = action.allScreens;
			return {
				...state,
			};

		case actionTypes.FETCH_ALL_SCREENS_FAILED:
			state.allScreens = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default screenReducer;
