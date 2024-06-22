import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailCinema.scss";
import Footer from "../Section/Footer";
import NavigationSection from "./NavigationSection";
import ShowtimeSection from "./ShowtimeSection";
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
				<NavigationSection id={this.props.match.params.id} />
				<ShowtimeSection id={this.props.match.params.id} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
