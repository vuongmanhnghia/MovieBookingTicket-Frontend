import React, { Component } from "react";
import { connect } from "react-redux";
import "./ShowtimeData.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
// Import css files

class ShowtimeData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showtimeDate: new Date().getDate(),
			showtimeCinema: "",
			showtimeData: [],
		};
	}

	componentDidMount() {
		this.handleView();
	}

	componentDidUpdate(prevProps) {
		let activeDate = document.querySelectorAll(".box-date");
		activeDate.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".box-date")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});

		let activeCinema = document.querySelectorAll(".box-cinema");
		activeCinema.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".box-cinema")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});

		let activeTime = document.querySelectorAll(".box-showtime");
		activeTime.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".box-showtime")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});
	}

	handleChangeDate = async (date) => {
		await this.setState({
			showtimeDate: await date,
		});
		await this.setState({
			showtimeData: await this.handleView(),
		});
	};

	handleChangeCinema = async (cinema) => {
		await this.setState({
			showtimeCinema: await cinema,
		});
		await this.setState({
			showtimeData: await this.handleView(),
		});
	};

	handleView = async () => {
		let dataView = this.props.showtimeData;
		let date = this.state.showtimeDate;
		let cinema = this.state.showtimeCinema;
		let result = [];
		await dataView.map((item) => {
			if (
				new Date(item.startDate).getDate() === date &&
				item.cinemaId.split(" ")[0] === cinema
			) {
				result.push(item);
			} else if (date === "" && item.cinemaId.split(" ")[0] === cinema) {
				result.push(item);
			} else if (
				new Date(item.startDate).getDate() === date &&
				cinema === ""
			) {
				result.push(item);
			}
		});
		return result;
	};

	render() {
		let maxDate = [1, 2, 3, 4, 5, 6, 7];
		let showtimeData = this.props.showtimeData;
		// let releaseTime = this.props.showtimeData.;
		return (
			<div className="movie-detail-showtimeData-container row">
				<div className="movie-detail-showtimeData-content col-8">
					<div className="showtimeData-content-title">
						Lịch chiếu{" "}
						{showtimeData && showtimeData.length > 0
							? showtimeData[0].movieId
							: " phim không tồn tại"}{" "}
					</div>
					<div className="showtimeData-container">
						<div className="showtimeData-date">
							{maxDate &&
								maxDate.length > 0 &&
								maxDate.map((item, index) => {
									let date = new Date();
									return (
										<div
											className="box-date"
											onClick={() =>
												this.handleChangeDate(
													date.getDate() + index
												)
											}>
											{date.getDate() + index}
										</div>
									);
								})}
						</div>
						<div className="showtimeData-cinema">
							<div
								className="box-cinema logo-lotte"
								onClick={() => this.handleChangeCinema("Lotte")}></div>
							<div className="logo-cinema"></div>
							<div
								className="box-cinema logo-beta"
								onClick={() => this.handleChangeCinema("Beta")}></div>
							<div className="logo-cinema"></div>
						</div>
						<div className="showtimeData-showtime">
							{this.state.showtimeData &&
								this.state.showtimeData.length > 0 &&
								this.state.showtimeData.map((item) => {
									return (
										<div className="box-showtime">
											{item.startTime}
										</div>
									);
								})}
						</div>
					</div>
				</div>
			</div>
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
	connect(mapStateToProps, mapDispatchToProps)(ShowtimeData)
);
