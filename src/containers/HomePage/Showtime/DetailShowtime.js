import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailShowtime.scss";
import { withRouter } from "react-router-dom";
import ShowtimeSection from "../Cinema/ShowtimeSection";
import SelectCinema from "./SelectCinema";
import HeaderShowtime from "./HeaderShowtime";
import BannerShowtime from "./BannerShowtime";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Footer from "../Section/Footer";
import Loading from "../Loading";
class DetailShowtime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tradeMark: "Lotte Cinema",
		};
	}

	async componentDidMount() {}
	async componentDidUpdate() {}

	handleShowSelectCinema = async (item) => {
		await this.setState({
			tradeMark: item,
		});
	};

	render() {
		let { tradeMark } = this.state;
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<Loading countdown={500} />
				<BannerShowtime />
				<SelectCinema
					handleShowSelectCinema={this.handleShowSelectCinema}
				/>
				<HeaderShowtime tradeMark={tradeMark} />
				<ShowtimeSection id={tradeMark} />
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
	return {
		// fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DetailShowtime)
);
