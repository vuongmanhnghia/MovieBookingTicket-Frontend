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
import * as actions from "../../../store/actions";
class DetailShowtime extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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

	handleGetQuantityCinema = (quantity) => {};

	render() {
		let { tradeMark, imageTradeMark } = this.state;
		let { detailCinema } = this.props;
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<BannerShowtime />
				<SelectCinema
					handleShowSelectCinema={this.handleShowSelectCinema}
					handleGetImageTradeMark={this.handleGetImageTradeMark}
				/>
				<HeaderShowtime tradeMark={tradeMark} />
				<ShowtimeSection
					handleGetQuantityCinema={this.handleGetQuantityCinema}
					tradeMark={tradeMark}
					detailCinema={detailCinema}
					imageTradeMark={imageTradeMark}
				/>
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
	connect(mapStateToProps, mapDispatchToProps)(DetailShowtime)
);
