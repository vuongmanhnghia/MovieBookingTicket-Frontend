import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailCinema.scss";

class DetailCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	render() {
		return (
			<>
				<HomeNavigation />
			</>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
