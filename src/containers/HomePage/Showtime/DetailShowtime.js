import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailShowtime.scss";
import Footer from "../Section/Footer";
import { withRouter } from "react-router-dom";
import DetailCinema from "../Cinema/DetailCinema";
class DetailShowtime extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		console.log(this.props);
	}

	render() {
		console.log(this.props);
		return (
			<>
				<HomeNavigation />
				{/* <DetailCinema /> */}
				<Footer />
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
	return {
		// fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DetailShowtime)
);
