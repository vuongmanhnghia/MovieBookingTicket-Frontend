import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CinemaShowtimeBooking.scss";
import * as actions from "../../../store/actions";
import BookingModal from "../Movie/BookingModal";

class CinemaShowtimeBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: false,
			dataShowtime: {},
		};
	}

	async componentDidMount() {
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

	handleChangeDate = async (date) => {
		await this.props.getDateSelected(date);
	};

	handleViewBookingModal = async (item) => {
		this.setState({
			image: item.image,
		});
		await this.props.fetchSeatsByShowtime(item);
		await this.setState({
			isOpenModal: true,
			dataShowtime: item,
			dataScreen: this.props.screenData,
			image: item.image,
		});
	};

	closeBookingModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	render() {
		let { dataView, tradeMark } = this.props;
		let { isOpenModal, dataScreen, dataShowtime } = this.state;
		return (
			<div className="cinema-showtime-container">
				<div className="cinema-showtime-content">
					<div className="list-showtime">
						<div className="list-showtime-cinema-box">
							<div className="list-showtime-date">
								{new Array(7).fill("vmn").map((item, index) => {
									let date = new Date().getDate();
									if (index === 0) {
										return (
											<div
												className="box-date active"
												onClick={() =>
													this.handleChangeDate(index)
												}>
												{date + index}
											</div>
										);
									} else {
										return (
											<div
												className="box-date"
												onClick={() =>
													this.handleChangeDate(index)
												}>
												{date + index}
											</div>
										);
									}
								})}
							</div>
							<div className="list-showtime-content">
								<div className="scrollbar">
									<div className="scrollbar-inner">
										{dataView &&
											dataView.length > 0 &&
											dataView.map((item) => {
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
																			tradeMark.name;
																		it.tradeMarkId =
																			tradeMark.tradeMark;
																		it.image =
																			item.movie.image;
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
											})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<BookingModal
					isOpenModal={isOpenModal}
					closeBookingModal={this.closeBookingModal}
					dataScreen={dataScreen}
					dataShowtime={dataShowtime}
					image={this.state.image}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		screenData: state.showtime.seatsByShowtime,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSeatsByShowtime: (showtime) =>
			dispatch(actions.fetchSeatsByShowtime(showtime)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CinemaShowtimeBooking)
);
