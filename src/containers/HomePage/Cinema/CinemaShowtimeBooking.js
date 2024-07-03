import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CinemaShowtimeBooking.scss";

class CinemaShowtimeBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		console.log(this.props.showtimeData);

		let activeDate = document.querySelectorAll(".box-date");
		activeDate.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".box-date")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	handleChangeDate = async (date) => {
		await this.setState({
			showtimeDate: await date,
		});
		this.setState({
			dataShow: await this.handleView(),
		});
	};

	handleView = async () => {
		let dataShow = await this.props.showtimeData;
		let result = [];
		dataShow.map((item) => {
			let showtime = item.showtime;
			let newShowtime = showtime.filter((item) => {
				return (
					new Date(item.startDate).getDate() === this.state.showtimeDate
				);
			});
			item.showtime = newShowtime;
			if (item.showtime.length > 0) {
				result.push(item);
			}
		});

		return result;
	};

	render() {
		let { showtimeData } = this.props;
		let maxDate = [1, 2, 3, 4, 5, 6, 7];
		return (
			<div className="cinema-showtime-container">
				<div className="cinema-showtime-content">
					<div className="list-showtime">
						<div className="list-showtime-cinema-box">
							<div className="list-showtime-date">
								{maxDate &&
									maxDate.length > 0 &&
									maxDate.map((item, index) => {
										let date = new Date();
										if (index === 0) {
											return (
												<div
													className="box-date active"
													onClick={() =>
														this.handleChangeDate(
															date.getDate() + index
														)
													}>
													{date.getDate() + index}
												</div>
											);
										} else {
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
										}
									})}
							</div>
							<div className="list-showtime-content">
								<div className="scrollbar">
									<div className="scrollbar-inner">
										{/* {dataShow &&
									dataShow.length > 0 &&
									dataShow.map((item) => {
										return (
											<div className="box-showtime">
												<div
													className="box-showtime-image"
													style={{
														background: `url(${item.movie.image})`,
													}}></div>
												<div className="box-showtime-info">
													<div className="box-showtime-name">
														{item.movie.title}
													</div>
													<div className="box-showtime-genre">
														{item.movie.genre}
													</div>
													<div className="box-showtime-showtimes">
														{item.showtime &&
															item.showtime.length > 0 &&
															item.showtime.map((it) => {
																it.cinemaId =
																	nameCinemaShowtime;
																it.tradeMarkId = tradeMark;
																it.image = item.movie.image;
																return (
																	<div
																		onClick={() =>
																			this.handleViewBookingModal(
																				it
																			)
																		}
																		className="box-showtime-startTime">
																		{it.startTime}
																	</div>
																);
															})}
													</div>
												</div>
											</div>
										);
									})} */}
									</div>
								</div>
							</div>
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
	connect(mapStateToProps, mapDispatchToProps)(CinemaShowtimeBooking)
);
