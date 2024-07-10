import React, { Component } from "react";
import { connect } from "react-redux";
import SlideMovie from "./Section/SlideMovie";
import Cinema from "./Section/Cinema";
import "./HomePage.scss";
import HomeBanner from "./Section/HomeBanner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SelectCinema from "./Showtime/SelectCinema";
import HeaderShowtime from "./Showtime/HeaderShowtime";
import ShowtimeSection from "./Cinema/ShowtimeSection";
import { withRouter } from "react-router-dom";
import CustomScrollbars from "../../components/CustomScrollbars";
import Footer from "./Section/Footer";
import * as actions from "../../store/actions";

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
		await this.props.fetchDetailCinema(item);
	};

	handleGetImageTradeMark = (item) => {
		this.setState({
			imageTradeMark: item,
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
		let { tradeMark, imageTradeMark } = this.state;
		let { detailCinema } = this.props;
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<HomeBanner />
				<SlideMovie settings={settings} />
				<SelectCinema
					handleShowSelectCinema={this.handleShowSelectCinema}
					handleGetImageTradeMark={this.handleGetImageTradeMark}
				/>
				<HeaderShowtime tradeMark={tradeMark} />
				<ShowtimeSection
					tradeMark={tradeMark}
					detailCinema={detailCinema}
					imageTradeMark={imageTradeMark}
				/>
				<Cinema />
				<Footer />
			</CustomScrollbars>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		detailCinema: state.cinema.detailCinema,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDetailCinema: (id) => dispatch(actions.fetchDetailCinema(id)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
