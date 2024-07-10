import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./NotDefind.scss";

class NotDefind extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	render() {
		return (
			<div className="not-defind-container">
				<div className="not-defind-content">
					<div className="not-defind-image"></div>
					<div className="not-defind-title">
						Úi, không tìm thấy suất chiếu
					</div>
					<div className="not-defind-more">
						Bạn hãy thử tìm ngày khác nhé
					</div>
				</div>
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
	connect(mapStateToProps, mapDispatchToProps)(NotDefind)
);
