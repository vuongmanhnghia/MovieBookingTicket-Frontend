import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import TableManageUser from "./TableManageUser.js";
class UserRedux extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genderArr: [],
			roleArr: [],
			previewImgUrl: "",

			email: "",
			password: "",
			fullName: "",
			phoneNumber: "",
			dateOfBirth: "",
			gender: "",
			address: "",
			role: "",
			image: "",

			action: "",
			userEditId: "",
		};
	}

	async componentDidMount() {
		this.props.getGenderStart();
		this.props.getRoleStart();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.genderRedux !== this.props.genderRedux) {
			let arrGenders = this.props.genderRedux;
			this.setState({
				genderArr: arrGenders,
				gender:
					arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
			});
		}
		if (prevProps.roleRedux !== this.props.roleRedux) {
			let arrRoles = this.props.roleRedux;
			this.setState({
				roleArr: this.props.roleRedux,
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
			});
		}

		if (prevProps.users !== this.props.users) {
			let arrGenders = this.props.genderRedux;
			let arrRoles = this.props.roleRedux;

			this.setState({
				email: "",
				password: "",
				fullName: "",
				phoneNumber: "",
				dateOfBirth: "",
				gender:
					arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
				address: "",
				role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
				image: "",
				action: CRUD_ACTIONS.CREATE,
				previewImgUrl: "",
			});
		}
	}

	handleOnChangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			let objectUrl = URL.createObjectURL(file);
			this.setState({
				previewImgUrl: objectUrl,
				image: base64,
			});
		}
	};

	handleSaveUser = () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;

		let { action } = this.state;

		if (action === CRUD_ACTIONS.CREATE) {
			//fire redux create ủe
			this.props.createNewUser({
				email: this.state.email,
				password: this.state.password,
				fullName: this.state.fullName,
				phoneNumber: this.state.phoneNumber,
				dateOfBirth: this.state.dateOfBirth,
				gender: this.state.gender,
				address: this.state.address,
				roleId: this.state.role,
				image: this.state.image,
			});
		}
		if (action === CRUD_ACTIONS.EDIT) {
			//fire redux edit user
			this.props.editUser({
				id: this.state.userEditId,
				email: this.state.email,
				password: this.state.password,
				fullName: this.state.fullName,
				phoneNumber: this.state.phoneNumber,
				dateOfBirth: this.state.dateOfBirth,
				gender: this.state.gender,
				address: this.state.address,
				roleId: this.state.role,
				image: this.state.image,
			});
		}
	};

	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = [
			"email",
			"password",
			"fullName",
			"phoneNumber",
			"dateOfBirth",
			"address",
		];
		for (let i = 0; i < arrCheck.length; i++) {
			if (this.state[arrCheck[i]] === "") {
				isValid = false;
				alert("Vui lòng nhập " + arrCheck[i] + " của bạn");
				break;
			}
		}

		return isValid;
	};

	onChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleEditUserFromParent = (user) => {
		let imageBase64 = "";
		if (user.image) {
			imageBase64 = new Buffer(user.image, "base64").toString("binary");
		}
		this.setState({
			email: user.email,
			password: "HARDCODED",
			fullName: user.fullName,
			phoneNumber: user.phoneNumber,
			dateOfBirth: user.dateOfBirth,
			gender: user.gender,
			address: user.address,
			role: user.roleId,
			image: "",
			previewImgUrl: imageBase64,
			action: CRUD_ACTIONS.EDIT,
			userEditId: user.id,
		});
	};

	render() {
		let genders = this.state.genderArr;
		let roles = this.state.roleArr;
		let isGetGenders = this.props.isLoadingGender;

		let {
			email,
			password,
			fullName,
			phoneNumber,
			dateOfBirth,
			gender,
			address,
			role,
		} = this.state;

		return (
			<div className="user-redux-container">
				<div className="title">User Redux - Vuong Manh Nghia</div>
				<div className="user-redux-body">
					<div className="container">
						<div className="row">
							<div className="col-12">
								{isGetGenders === true ? "Loading gender" : ""}
							</div>
							<div className="add-user col-12 my-3 ">
								<FormattedMessage id="manage-user.add" />
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.email" />
								</label>
								<input
									type="email"
									className="form-control"
									placeholder="Email"
									value={email}
									onChange={(event) => {
										this.onChangeInput(event, "email");
									}}
									disabled={this.state.action === CRUD_ACTIONS.EDIT}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.password" />
								</label>
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									value={password}
									onChange={(event) => {
										this.onChangeInput(event, "password");
									}}
									disabled={this.state.action === CRUD_ACTIONS.EDIT}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.fullName" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Full name"
									value={fullName}
									onChange={(event) => {
										this.onChangeInput(event, "fullName");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.phoneNumber" />
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Phone number"
									value={phoneNumber}
									onChange={(event) => {
										this.onChangeInput(event, "phoneNumber");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.dateOfBirth" />
								</label>
								<input
									type="date"
									className="form-control"
									placeholder="Date of birth"
									value={dateOfBirth}
									onChange={(event) => {
										this.onChangeInput(event, "dateOfBirth");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.gender" />
								</label>
								<select
									className="form-control"
									onChange={(event) => {
										this.onChangeInput(event, "gender");
									}}
									value={gender}>
									{genders &&
										genders.length > 0 &&
										genders.map((item, index) => {
											return (
												<option key={index} value={item.key}>
													{" "}
													{item.value}
												</option>
											);
										})}
								</select>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.address" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Địa chỉ"
									value={address}
									onChange={(event) => {
										this.onChangeInput(event, "address");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-user.role" />
								</label>
								<select
									className="form-control"
									onChange={(event) => {
										this.onChangeInput(event, "role");
									}}
									value={role}>
									{roles &&
										roles.length > 0 &&
										roles.map((item, index) => {
											return (
												<option key={index} value={item.key}>
													{item.value}
												</option>
											);
										})}
								</select>
							</div>
							<div className="form-group col-12 form-preview-img">
								<label>
									<FormattedMessage id="manage-user.img" />
								</label>
								<div className="preview-image-container">
									<input
										hidden
										id="previewImg"
										type="file"
										onChange={(event) => {
											this.handleOnChangeImage(event);
										}}
									/>
									<label className="label-upload" htmlFor="previewImg">
										Tải ảnh <i className="fas fa-upload"></i>
									</label>
									<div
										className="preview-image"
										style={{
											backgroundImage: `url(${this.state.previewImgUrl})`,
										}}></div>
								</div>
							</div>

							<div className="form-group col-12"></div>
							<div className="form-group col-12">
								<button
									onClick={() => {
										this.handleSaveUser();
									}}
									className={
										this.state.action === CRUD_ACTIONS.EDIT
											? "from-control btn btn-warning mt-3 col-12"
											: "form-control btn btn-primary mt-3 col-12"
									}
									type="submit">
									{this.state.action === CRUD_ACTIONS.EDIT ? (
										<FormattedMessage id="manage-user.edit" />
									) : (
										<FormattedMessage id="manage-user.save" />
									)}
								</button>
							</div>
							<div className="col-12 mb-5">
								<TableManageUser
									handleEditUserFromParent={
										this.handleEditUserFromParent
									}
									action={this.state.action}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		genderRedux: state.admin.genders,
		roleRedux: state.admin.roles,
		isLoadingGender: state.admin.isLoadingGender,
		users: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getGenderStart: () => dispatch(actions.fetchGenderStart()),
		getRoleStart: () => dispatch(actions.fetchRoleStart()),
		createNewUser: (data) => dispatch(actions.createNewUser(data)),
		fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
		editUser: (data) => dispatch(actions.editUser(data)),

		// processLogout: () => dispatch(actions.processLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
