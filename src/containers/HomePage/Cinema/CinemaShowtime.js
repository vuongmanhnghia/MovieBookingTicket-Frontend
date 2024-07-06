import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import CustomScrollbars from "../../../components/CustomScrollbars";
import CinemaShowtimeBanner from "./CinemaShowtimeBanner";
import CinemaShowtimeBooking from "./CinemaShowtimeBooking";
import Footer from "../Section/Footer";
import { getShowtimeByCinemaAndDateService } from "../../../services/showtimeService";
import moment from "moment";

class CinemaShowtime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataView: [],
		};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.name
		) {
			let name = this.props.match.params.name;
			await this.props.fetchTradeMarkByCinema(name);
			await this.getDataView(name, moment().format("DD/MM/YYYY"));
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	getDateSelected = async (date) => {
		await this.getDataView(
			this.props.match.params.name,
			moment().add(date, "days").format("DD/MM/YYYY")
		);
	};

	getDataView = async (name, date) => {
		let data = await getShowtimeByCinemaAndDateService(name, date);
		await this.setState({
			dataView: data.data,
		});
	};

	render() {
		let { tradeMark } = this.props;
		let { dataView } = this.state;
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<CinemaShowtimeBanner tradeMark={tradeMark} />
				<CinemaShowtimeBooking
					dataView={dataView}
					getDateSelected={this.getDateSelected}
					tradeMark={tradeMark}
				/>
				<Footer />
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
		fetchTradeMarkByCinema: (name) =>
			dispatch(actions.fetchTradeMarkByCinema(name)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CinemaShowtime)
);
