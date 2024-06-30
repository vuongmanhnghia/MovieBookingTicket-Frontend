import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CinemaComponent.scss";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Footer from "../Section/Footer";
import CinemaBanner from "./CinemaBanner";
import CinemaSearch from "./CinemaSearch";
import SlideMovie from "../Section/SlideMovie";
import Cinema from "../Section/Cinema";

class CinemaComponent extends Component {
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
		let settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 5,
		};
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				{/* <Loading countdown={1000} /> */}
				<CinemaBanner />
				<div className="cinema-component-title">Tìm rạp chiếu phim</div>
				<div className="cinema-component-box">
					<CinemaSearch />
				</div>
				<SlideMovie settings={settings} />
				<Cinema />
				<Footer />
			</CustomScrollbars>
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
	connect(mapStateToProps, mapDispatchToProps)(CinemaComponent)
);
