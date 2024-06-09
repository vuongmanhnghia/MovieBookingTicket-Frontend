import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
	getAllUsers,
	createNewUserService,
	deleteUserService,
	editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			isOpenModalUser: false,
			isOpenModalEditUser: false,
			userEdit: {},
		};
	}

	async componentDidMount() {
		await this.getAllUsersFromReact();
	}

	getAllUsersFromReact = async () => {
		let response = await getAllUsers("ALL");
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	};

	handleAddNewUser = () => {
		this.setState({
			isOpenModalUser: true,
		});
	};

	toggleUserModal = () => {
		this.setState({
			isOpenModalUser: !this.state.isOpenModalUser,
		});
	};

	toggleUserEditModal = () => {
		this.setState({
			isOpenModalEditUser: !this.state.isOpenModalEditUser,
		});
	};

	createNewUser = async (data) => {
		try {
			let response = await createNewUserService(data);
			if (response && response.errCode !== 0) {
				alert(response.errMessage);
			} else {
				await this.getAllUsersFromReact();
				this.setState({
					isOpenModalUser: false,
				});
				emitter.emit("EVENT_CLEAR_MODAL_DATA");
			}
		} catch (e) {
			console.log(e);
		}
	};

	handleDeleteUser = async (user) => {
		try {
			let response = await deleteUserService(user.id);
			if (response && response.errCode === 0) {
				await this.getAllUsersFromReact();
			} else {
				alert(response.errMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	handleEditUser = (user) => {
		this.setState({
			isOpenModalEditUser: true,
			userEdit: user,
		});
	};

	doEditUser = async (user) => {
		try {
			let response = await editUserService(user);
			if (response && response.errCode === 0) {
				this.setState({
					isOpenModalEditUser: false,
				});
				await this.getAllUsersFromReact();
			} else {
				alert(response.errMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="user-container">
				<ModalUser
					isOpen={this.state.isOpenModalUser}
					toggleFromParent={this.toggleUserModal}
					createNewUser={this.createNewUser}
				/>
				{this.state.isOpenModalEditUser && (
					<ModalEditUser
						isOpen={this.state.isOpenModalEditUser}
						toggleFromParent={this.toggleUserEditModal}
						currentUser={this.state.userEdit}
						editUser={this.doEditUser}
					/>
				)}
				<div className="title">Manage users</div>
				<div className="mx-1">
					<button
						className="btn btn-primary px-3"
						onClick={() => this.handleAddNewUser()}>
						<i className="fas fa-plus px-2"></i>Add new user
					</button>
				</div>
				<div className="users-table mt-3 mx-1">
					<table id="customers">
						<tbody>
							<tr>
								<th>Email</th>
								<th>Full name</th>
								<th>Phone number</th>
								<th>Gender</th>
								<th>Address</th>
								<th>Actions</th>
							</tr>

							{arrUsers &&
								arrUsers.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.email}</td>
											<td>{item.fullName}</td>
											<td>{item.phoneNumber}</td>
											<td>{item.gender}</td>
											<td>{item.address}</td>
											<td>
												<button className="btn-edit">
													<i
														className="fas fa-edit"
														onClick={() => {
															this.handleEditUser(item);
														}}></i>
												</button>
												<button className="btn-delete">
													<i
														className="fas fa-trash-alt"
														onClick={() => {
															this.handleDeleteUser(item);
														}}></i>
												</button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
