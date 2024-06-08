import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userRedux: [],
		};
	}

	componentDidMount() {
		this.props.fetchUserRedux();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.users !== this.props.users) {
			this.setState({
				userRedux: this.props.users,
			});
		}
	}

	render() {
		let arrUsers = this.state.userRedux;
		return (
			<table id="TableManageUser">
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
						arrUsers.length > 0 &&
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
											<i className="fas fa-edit"></i>
										</button>
										<button className="btn-delete">
											<i className="fas fa-trash-alt"></i>
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
