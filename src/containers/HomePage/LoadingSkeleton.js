import React, { Component } from "react";
import { connect } from "react-redux";
import "./LoadingSkeleton.scss";

class LoadingSkeleton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let { style } = this.props;
		return <div className="skeleton" style={style}></div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(LoadingSkeleton);
