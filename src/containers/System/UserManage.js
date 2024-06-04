import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
		};
	}

	async componentDidMount() {
		let response = await getAllUsers("ALL");
		if (response && response.errCode === 0) {
			this.setState({
				arrUsers: response.users,
			});
		}
	}

	render() {
		console.log(this.state);
		let arrUsers = this.state.arrUsers;
		return (
			<div className="user-container">
				<div className="title">Manage users</div>
				<div className="users-table mt-3 mx-1">
					<table id="customers">
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
								console.log("check map", item, index);
								return (
									<tr>
										<td>{item.email}</td>
										<td>{item.fullName}</td>
										<td>{item.phoneNumber}</td>
										<td>{item.gender}</td>
										<td>{item.address}</td>
										<td>
											<button className="btn-edit">
												<i class="fas fa-edit"></i>
											</button>
											<button className="btn-delete">
												<i class="fas fa-trash-alt"></i>
											</button>
										</td>
									</tr>
								);
							})}
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
