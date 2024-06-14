import actionTypes from "./actionTypes";
import {
	getAllCodeService,
	createNewUserService,
	getAllUsers,
	deleteUserService,
	editUserService,
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
			let response = await createNewUserService(data);
			if (response && response.errCode === 0) {
				dispatch(createUserSuccess());
				dispatch(fetchAllUsersStart());
				toast.success("Tạo mới tài khoản thành công!");
			} else {
				toast.error("Tạo mới tài khoản thất bại!");
				dispatch(createUserFailed());
			}
		} catch (e) {
			toast.error("Tạo mới tài khoản thất bại!");
			dispatch(createUserFailed());
			console.log("Create user errol: ", e);
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
				toast.error("Lấy thông tin tài khoản thất bại!");
				dispatch(fetchAllUsersFailed());
			}
		} catch (e) {
			toast.error("Lấy thông tin tài khoản thất bại!");
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

export const deleteUser = (userId) => {
	return async (dispatch, getState) => {
		try {
			let response = await deleteUserService(userId);
			if (response && response.errCode === 0) {
				dispatch(deleteUserSuccess());
				dispatch(fetchAllUsersStart());
				toast.success("Xoá tài khoản thành công!");
			} else {
				toast.error("Xoá tài khoản thất bại!");

				dispatch(deleteUserFailed());
			}
		} catch (e) {
			toast.error("Xoá tài khoản thất bại!");
			dispatch(deleteUserFailed());
			console.log("Delete user errol: ", e);
		}
	};
};

export const deleteUserSuccess = () => ({
	type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
	type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
	return async (dispatch, getState) => {
		try {
			let response = await editUserService(data);
			if (response && response.errCode === 0) {
				dispatch(editUserSuccess());
				dispatch(fetchAllUsersStart());
				toast.success("Cập nhật tài khoản thành công!");
			} else {
				toast.error("Cập nhật tài khoản thất bại!");

				dispatch(editUserFailed());
			}
		} catch (e) {
			toast.error("Cập nhật tài khoản thất bại!");
			dispatch(editUserFailed());
			console.log("Update user errol: ", e);
		}
	};
};

export const editUserSuccess = () => ({
	type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
	type: actionTypes.EDIT_USER_FAILED,
});

export const fetchAllTimes = () => {
	return async (dispatch, getState) => {
		try {
			let response = await getAllCodeService("TIME");
			if (response && response.errCode === 0) {
				dispatch({
					type: actionTypes.FETCH_ALLCODE_TIME_SUCCESS,
					dataTime: response.data,
				});
			} else {
				dispatch({
					type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
				});
			}
		} catch (e) {
			dispatch(fetchAllUsersFailed());
			dispatch({
				type: actionTypes.FETCH_ALLCODE_TIME_FAILED,
			});
		}
	};
};
