import React, { Component } from "react";
import { connect } from "react-redux";
import "./TrailerMovie.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom";

class TrailerMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState,
		});
	};

	render() {
		let { isOpenModal, closeBookingModal } = this.props;
		return (
			<Modal
				isOpen={isOpenModal}
				className={"booking-modal-container"}
				size="lg"
				centered>
				<div className="booking-modal-content"></div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewBooking: (data) => {
			dispatch(actions.createNewBooking(data));
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TrailerMovie)
);
