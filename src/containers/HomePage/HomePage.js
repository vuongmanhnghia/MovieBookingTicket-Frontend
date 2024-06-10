import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "./HomeNavigation";
import Specialty from "./Section/Specialty";
import Cinema from "./Section/Cinema";
import "./HomePage.scss";
import HomeBanner from "./Section/HomeBanner";
import Footer from "./Section/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
	render() {
		let settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 5,
		};
		return (
			<div>
				<HomeNavigation />
				<HomeBanner />
				<Specialty settings={settings} />
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
