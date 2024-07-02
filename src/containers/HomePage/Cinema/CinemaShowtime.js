import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import CustomScrollbars from "../../../components/CustomScrollbars";
import CinemaShowtimeBanner from "./CinemaShowtimeBanner";
import CinemaShowtimeBooking from "./CinemaShowtimeBooking";

class CinemaShowtime extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.name
		) {
			let name = this.props.match.params.name;
			await this.props.fetchShowtimeByCinema(name);
			await this.props.fetchTradeMarkByCinema(name);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	render() {
		let { showtimeData, tradeMark } = this.props;
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<CinemaShowtimeBanner tradeMark={tradeMark} />
				<CinemaShowtimeBooking showtimeData={showtimeData} />
			</CustomScrollbars>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		showtimeData: state.cinema.showtimeData,
		tradeMark: state.cinema.tradeMark,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchShowtimeByCinema: (name) =>
			dispatch(actions.fetchShowtimeByCinema(name)),
		fetchTradeMarkByCinema: (name) =>
			dispatch(actions.fetchTradeMarkByCinema(name)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CinemaShowtime)
);
