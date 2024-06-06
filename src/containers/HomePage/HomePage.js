import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import Cinema from "./Section/Cinema";
import "./HomePage.scss";
import Footer from "./Section/Footer";

class HomePage extends Component {
	render() {
		return (
			<div>
				<HomeHeader />
				<Specialty />
				<Cinema />
				<Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
