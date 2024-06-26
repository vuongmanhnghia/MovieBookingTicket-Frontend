import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Loading.scss";
import { Modal } from "reactstrap";

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: true,
		};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	closeLoading = () => {
		// this.setState({
		// 	isOpenModal: false,
		// });
	};

	render() {
		let { isOpenModal } = this.state;
		let { countdown } = this.props;
		return (
			<div className="loading-container">
				<Modal
					isOpen={isOpenModal}
					// className={"booking-modal-container"}
					// size="lg"
					centered>
					{setTimeout(() => {
						this.closeLoading();
					}, countdown)}
					<div class="loader"></div>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Loading)
);
