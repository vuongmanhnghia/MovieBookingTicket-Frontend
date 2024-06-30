import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./MovieComponent.scss";
import BannerMovie from "./BannerMovie";
import Slide from "./Slide";
import AllMovies from "./AllMovies";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Footer from "../Section/Footer";
// import Loading from "../Loading";

class MovieComponent extends Component {
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
				{/* <Loading countdown={700} /> */}
				<BannerMovie />
				<Slide settings={settings} />
				<AllMovies />
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
	connect(mapStateToProps, mapDispatchToProps)(MovieComponent)
);
