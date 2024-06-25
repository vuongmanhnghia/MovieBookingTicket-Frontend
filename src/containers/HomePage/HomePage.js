import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "./HomeNavigation";
import SlideMovie from "./Section/SlideMovie";
import Cinema from "./Section/Cinema";
import "./HomePage.scss";
import HomeBanner from "./Section/HomeBanner";
import Footer from "./Section/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DetailShowtime from "./Showtime/DetailShowtime";
import SelectCinema from "./Showtime/SelectCinema";
import HeaderShowtime from "./Showtime/HeaderShowtime";
import ShowtimeSection from "./Cinema/ShowtimeSection";

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tradeMark: "Lotte Cinema",
		};
	}
	handleShowSelectCinema = async (item) => {
		await this.setState({
			tradeMark: item,
		});
	};
	render() {
		let settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 5,
		};
		let { tradeMark } = this.state;
		return (
			<div>
				<HomeNavigation />
				<HomeBanner />
				<SlideMovie settings={settings} />
				<SelectCinema
					handleShowSelectCinema={this.handleShowSelectCinema}
				/>
				<HeaderShowtime tradeMark={tradeMark} />
				<ShowtimeSection id={tradeMark} />
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
