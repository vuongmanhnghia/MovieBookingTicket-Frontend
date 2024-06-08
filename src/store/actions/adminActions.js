import actionTypes from "./actionTypes";
import {
	getAllCodeService,
	createNewUserService,
	getAllUsers,
} from "../../services/userService";
import { toast } from "react-toastify";

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
			toast.success("Tạo mới tài khoản thành công!");
			if (response && response.errCode === 0) {
				dispatch(createUserSuccess());
				dispatch(fetchAllUsersStart());
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

export const fetchAllUsersStart = () => {
	return async (dispatch, getState) => {
		try {
			let response = await getAllUsers("ALL");
			if (response && response.errCode === 0) {
				dispatch(fetchAllUsersSuccess(response.users.reverse()));
			} else {
				dispatch(fetchAllUsersFailed());
			}
		} catch (e) {
			dispatch(fetchAllUsersFailed());
			console.log("fetch role start errol: ", e);
		}
	};
};

export const fetchAllUsersSuccess = (data) => ({
	type: actionTypes.FETCH_ALL_USERS_SUCCESS,
	users: data,
});

export const fetchAllUsersFailed = () => ({
	type: actionTypes.FETCH_ALL_USERS_FAILED,
});
