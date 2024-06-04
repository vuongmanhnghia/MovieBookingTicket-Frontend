import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class ModalUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			fullName: "",
			phoneNumber: "",
			address: "",
		};
	}

	componentDidMount() {}

	toggle = () => {
		this.props.toggleFromParent();
	};

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState,
		});
	};

	checkValidateInput = () => {
		let isValid = true;
		let arrInput = [
			"email",
			"password",
			"fullName",
			"phoneNumber",
			"address",
		];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				alert("Missing parameter: " + arrInput[i]);
				break;
			}
		}
		return isValid;
	};

	handleAddNewUser = () => {
		let isValid = this.checkValidateInput();
		if (isValid === true) {
			//call API create modal
			this.props.createNewUser(this.state);
		}
	};

	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				toggle={() => {
					this.toggle();
				}}
				className={"modal-user-container"}
				size="lg"
				centered>
				<ModalHeader
					toggle={() => {
						this.toggle();
					}}>
					Create new user
				</ModalHeader>
				<ModalBody>
					<div className="row">
						<div className="col-6 form-group">
							<label>Email</label>
							<input
								type="text"
								className="form-control"
								onChange={(event) => {
									this.handleOnChangeInput(event, "email");
								}}
								value={this.state.email}
							/>
						</div>
						<div className="col-6 form-group">
							<label>Password</label>
							<input
								type="password"
								className="form-control"
								onChange={(event) => {
									this.handleOnChangeInput(event, "password");
								}}
								value={this.state.password}
							/>
						</div>
						<div className="col-6">
							<label>Full name</label>
							<input
								type="text"
								className="form-control"
								onChange={(event) => {
									this.handleOnChangeInput(event, "fullName");
								}}
								value={this.state.fullName}
							/>
						</div>
						<div className="col-6">
							<label>Phone number</label>
							<input
								type="number"
								className="form-control"
								onChange={(event) => {
									this.handleOnChangeInput(event, "phoneNumber");
								}}
								value={this.state.phoneNumber}
							/>
						</div>
						<div className="col-12">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								onChange={(event) => {
									this.handleOnChangeInput(event, "address");
								}}
								value={this.state.address}
							/>
						</div>
						{/* <div className="col-5">
							<label>Date of birth</label>
							<input type="date" className="form-control" />
						</div>
						<div className="col-4">
							<label>Sex</label>
							<select className="form-control">
								<option value="0">Male</option>
								<option value="1">Female</option>
							</select>
						</div>
						<div className="col-3">
							<label>Role</label>
							<select className="form-control">
								<option value="1">Admin</option>
								<option value="2">User</option>
							</select>
						</div> */}
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						className="btn btn-primary px-3"
						color="primary"
						onClick={() => {
							this.handleAddNewUser();
						}}>
						{" "}
						Add new
					</Button>{" "}
					<Button
						className="btn btn-danger px-3"
						color="secondary"
						onClick={() => {
							this.toggle();
						}}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
