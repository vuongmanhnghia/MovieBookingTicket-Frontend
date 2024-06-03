import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		let response = await getAllUsers("ALL");
		console.log("Get users from node.js:", response);
	}

	render() {
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
						<tr>
							<td>Alfreds Futterkiste</td>
							<td>Maria Anders</td>
							<td>Germany</td>
							<td>Germany</td>
							<td>Germany</td>
							<td>Germany</td>
						</tr>
						<tr>
							<td>Berglunds snabbköp</td>
							<td>Christina Berglund</td>
							<td>Sweden</td>
							<td>Sweden</td>
							<td>Sweden</td>
						</tr>
						<tr>
							<td>Centro comercial Moctezuma</td>
							<td>Francisco Chang</td>
							<td>Mexico</td>
							<td>Mexico</td>
							<td>Mexico</td>
						</tr>
						<tr>
							<td>Ernst Handel</td>
							<td>Roland Mendel</td>
							<td>Austria</td>
							<td>Austria</td>
							<td>Austria</td>
						</tr>
						<tr>
							<td>Island Trading</td>
							<td>Helen Bennett</td>
							<td>UK</td>
							<td>UK</td>
							<td>UK</td>
						</tr>
						<tr>
							<td>Königlich Essen</td>
							<td>Philip Cramer</td>
							<td>UK</td>
							<td>UK</td>
							<td>Germany</td>
						</tr>
						<tr>
							<td>Laughing Bacchus Winecellars</td>
							<td>Yoshi Tannamuri</td>
							<td>UK</td>
							<td>UK</td>
							<td>Canada</td>
						</tr>
						<tr>
							<td>Magazzini Alimentari Riuniti</td>
							<td>Giovanni Rovelli</td>
							<td>UK</td>
							<td>UK</td>
							<td>Italy</td>
						</tr>
						<tr>
							<td>North/South</td>
							<td>Simon Crowther</td>
							<td>UK</td>
							<td>UK</td>
							<td>UK</td>
						</tr>
						<tr>
							<td>Paris spécialités</td>
							<td>Marie Bertrand</td>
							<td>UK</td>
							<td>UK</td>
							<td>France</td>
						</tr>
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
