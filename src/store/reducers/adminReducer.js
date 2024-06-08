import actionTypes from "../actions/actionTypes";

const initContentOfConfirmModal = {
	isOpen: false,
	messageId: "",
	handleFunc: null,
	dataFunc: null,
};

const initialState = {
	isLoadingGender: false,
	genders: [],
	roles: [],
};

const adminReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GENDER_START:
			let copyState = { ...state };
			copyState.isLoadingGender = true;
			return {
				...copyState,
			};
		case actionTypes.FETCH_GENDER_SUCCESS:
			state.genders = action.data;
			state.isLoadingGender = false;
			return {
				...state,
			};
		case actionTypes.FETCH_GENDER_FAILED:
			state.isLoadingGender = false;
			state.genders = [];
			return {
				...state,
			};

		case actionTypes.FETCH_ROLE_START:
			state.isLoadingRole = true;
			return {
				...state,
			};
		case actionTypes.FETCH_ROLE_SUCCESS:
			state.roles = action.data;
			state.isLoadingRole = false;
			return {
				...state,
			};
		case actionTypes.FETCH_ROLE_FAILED:
			state.isLoadingRole = false;
			state.roles = [];
			return {
				...state,
			};

		default:
			return state;
	}
};

export default adminReducer;
