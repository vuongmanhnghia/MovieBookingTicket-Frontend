import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";

class UserRedux extends Component {
	constructor(props) {
		super(props);
		this.state = {
			genderArr: [],
		};
	}

	async componentDidMount() {
		try {
			let res = await getAllCodeService("gender");
			if (res && res.errCode === 0) {
				this.setState({
					genderArr: res.data,
				});
			}
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		let genders = this.state.genderArr;
		return (
			<div className="user-redux-container">
				<div className="title">User Redux - Vuong Manh Nghia</div>
				<div className="user-redux-body">
					<div className="container">
						<div className="row">
							<div className="add-user col-12 my-3 ">
								<FormattedMessage id="manage-user.add" />
							</div>
							<div className="form-group col-6">
								<label for="inputEmail4">
									<FormattedMessage id="manage-user.email" />
								</label>
								<input
									type="email"
									className="form-control"
									placeholder="Email"
								/>
							</div>
							<div className="form-group col-6">
								<label for="inputPassword4">
									<FormattedMessage id="manage-user.password" />
								</label>
								<input
									type="password"
									className="form-control"
									id="inputPassword4"
									placeholder="Password"
								/>
							</div>
							<div className="form-group col-6">
								<label for="inputAddress">
									<FormattedMessage id="manage-user.fullName" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Full name"
								/>
							</div>
							<div className="form-group col-6">
								<label for="inputAddress">
									<FormattedMessage id="manage-user.phoneNumber" />
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Phone number"
								/>
							</div>
							<div className="form-group col-6">
								<label for="inputAddress">
									<FormattedMessage id="manage-user.dateOfBirth" />
								</label>
								<input
									type="date"
									className="form-control"
									placeholder="Date of birth"
								/>
							</div>
							<div className="form-group col-6">
								<label for="inputGender">
									<FormattedMessage id="manage-user.gender" />
								</label>
								<select className="form-control">
									{genders &&
										genders.length > 0 &&
										genders.map((item, index) => {
											return <option>{item.value}</option>;
										})}
								</select>
							</div>
							<div className="form-group col-12">
								<label for="inputAddress">
									<FormattedMessage id="manage-user.address" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Địa chỉ"
								/>
							</div>
							<div className="form-group col-6">
								<label for="image">
									<FormattedMessage id="manage-user.img" />
								</label>
								<input type="text" className="form-control" />
							</div>
							<div className="form-group col-6">
								<label for="inputRole">
									<FormattedMessage id="manage-user.role" />
								</label>
								<select class="form-control">
									<option selected>Choose...</option>
									<option>Admin</option>
									<option>Client</option>
								</select>
							</div>

							<div className="form-group col-12"></div>
							<div className="form-group col-12">
								<button
									className="form-control btn btn-primary mt-3"
									type="submit">
									<FormattedMessage id="manage-user.save" />
								</button>
							</div>
						</div>
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
