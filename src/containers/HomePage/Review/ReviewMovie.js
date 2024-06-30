import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ReviewMovie.scss";
import BannerReview from "./BannerReview";
import ReviewSection from "./ReviewSection";
import CustomScrollbars from "../../../components/CustomScrollbars";
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
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<Loading countdown={700} />
				<BannerReview />
				<ReviewSection />
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
	connect(mapStateToProps, mapDispatchToProps)(ReviewMovie)
);
