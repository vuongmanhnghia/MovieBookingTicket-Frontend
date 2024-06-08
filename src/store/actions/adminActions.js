import actionTypes from "./actionTypes";
import {
	getAllCodeService,
	createNewUserService,
} from "../../services/userService";

// export const fetchGenderStart = () => ({
// 	type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_GENDER_START,
			});
			let response = await getAllCodeService("GENDER");
			if (response && response.errCode === 0) {
				dispatch(fetchGenderSuccess(response.data));
			} else {
				dispatch(fetchGenderFailed());
			}
		} catch (e) {
			dispatch(fetchGenderFailed());
			console.log("fetch gender start errol: ", e);
		}
	};
};

export const fetchGenderSuccess = (genderData) => ({
	type: actionTypes.FETCH_GENDER_SUCCESS,
	data: genderData,
});

export const fetchGenderFailed = () => ({
	type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_ROLE_START,
			});
			let response = await getAllCodeService("ROLE");
			if (response && response.errCode === 0) {
				dispatch(fetchRoleSuccess(response.data));
			} else {
				dispatch(fetchRoleFailed());
			}
		} catch (e) {
			dispatch(fetchRoleFailed());
			console.log("fetch role start errol: ", e);
		}
	};
};

export const fetchRoleSuccess = (roleData) => ({
	type: actionTypes.FETCH_ROLE_SUCCESS,
	data: roleData,
});

export const fetchRoleFailed = () => ({
	type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
	return async (dispatch, getState) => {
		try {
			dispatch({
				type: actionTypes.FETCH_ROLE_START,
			});
			let response = await createNewUserService(data);
			console.log("check create user redux: ", response);
			if (response && response.errCode === 0) {
				dispatch(createUserSuccess(response.data));
			} else {
				dispatch(createUserFailed());
			}
		} catch (e) {
			dispatch(createUserFailed());
			console.log("fetch role start errol: ", e);
		}
	};
};

export const createUserSuccess = () => ({
	type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
	type: actionTypes.CREATE_USER_FAILED,
});
