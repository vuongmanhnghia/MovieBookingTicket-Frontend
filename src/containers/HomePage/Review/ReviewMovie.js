import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ReviewMovie.scss";
import HomeNavigation from "../HomeNavigation";
import BannerReview from "./BannerReview";
import ReviewSection from "./ReviewSection";
import Footer from "../Section/Footer";
import Loading from "../Loading";

class ReviewMovie extends Component {
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
			<>
				<Loading countdown={700} />
				<HomeNavigation />
				<BannerReview />
				<ReviewSection />
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
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ReviewMovie)
);
