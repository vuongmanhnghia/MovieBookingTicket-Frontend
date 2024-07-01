import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ShowtimeSection.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";
import { getShowtimeByCinemaService } from "../../../services/showtimeService";
import BookingModal from "../Movie/BookingModal";
import * as actions from "../../../store/actions";
import LoadingSkeleton from "../LoadingSkeleton";
class ShowtimeSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailCinema: [],
			tradeMark: "",
			background: "",
			image: "",
			nameCinemaShowtime: "",
			location: "",
			maxDate: [1, 2, 3, 4, 5, 6, 7],

			dataShow: [],
			showtimeCinema: "",
			showtimeDate: new Date().getDate(),

			isOpenModal: false,
			dataShowtime: {},
			dataScreen: {},

			loading: true,
		};
	}

	async componentDidMount() {
		if (this.props.id) {
			let id = this.props.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				await this.setState({
					detailCinema: response.data,
				});
			}
			this.setState({
				background: this.state.detailCinema[0].image,
			});
		}

		let activeCinema = document.querySelectorAll(".list-cinema-box");
		activeCinema.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".list-cinema-box")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});

		let activeDate = document.querySelectorAll(".box-date");
		activeDate.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".box-date")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});
		document
			.querySelectorAll(".list-cinema-box")
			.forEach((item) => item.classList.remove("active"));
	}

	handleChaneBoxCinema = async (item) => {
		await this.setState({
			showtimeCinema: item.name,
		});
		let activeCinema = document.querySelector(".cinema-box-content");
		activeCinema.style = "opacity: 1";
		await this.setState({
			nameCinemaShowtime: item.name,
			location: item.location,
		});
		this.setState({
			dataShow: await this.handleView(),
		});
	};

	handleChangeDate = async (date) => {
		await this.setState({
			showtimeDate: await date,
		});
		this.setState({
			dataShow: await this.handleView(),
		});
	};

	handleView = async () => {
		let dataShow = (
			await getShowtimeByCinemaService(this.state.showtimeCinema)
		).data;
		if (!dataShow || dataShow.length === 0) {
			return;
		} else if (this.state.showtimeCinema === "") {
			return;
		} else {
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
		}
	};

	async componentDidUpdate(prevProps, prevState) {
		let activeCinema = document.querySelectorAll(".list-cinema-box");
		activeCinema.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".list-cinema-box")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});
		if (prevProps.id !== this.props.id) {
			this.setState({
				dataShow: [],
			});
			document.querySelector(".cinema-box-content").style = "opacity: 0";
			document
				.querySelectorAll(".list-cinema-box")
				.forEach((item) => item.classList.remove("active"));
			if (this.props.id) {
				let id = this.props.id;
				let response = await getDetailCinemaService(id);
				if (response && response.errCode === 0) {
					await this.setState({
						detailCinema: response.data,
					});
				}
				await this.setState({
					background: this.state.detailCinema[0].image,
					tradeMark: this.state.detailCinema[0].tradeMark,
				});
			}
		}
	}

	handleViewBookingModal = async (item) => {
		console.log(item);
		this.setState({
			image: item.image,
		});
		await this.props.fetchSeatsByShowtime(item);
		this.setState({
			isOpenModal: true,
			dataShowtime: item,
			dataScreen: this.props.screenData,
		});
	};

	closeBookingModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	closeLoading = (countdown) => {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, countdown);
	};

	render() {
		let {
			tradeMark,
			detailCinema,
			background,
			nameCinemaShowtime,
			location,
			maxDate,
			dataShow,
			isOpenModal,
			dataScreen,
			dataShowtime,
			loading,
		} = this.state;
		return (
			<>
				<div className="cinema-detail-showtime-container">
					<div className="cinema-detail-showtime-content">
						<div className="detail-showtime-content row">
							<div className="null col-12"></div>
							<div className="col-5 list-cinema">
								{this.closeLoading(3000)}
								{detailCinema.map((item, index) => {
									return (
										<div
											className="list-cinema-box"
											onClick={() =>
												this.handleChaneBoxCinema(item)
											}>
											{loading && (
												<LoadingSkeleton
													style={{
														width: "40px",
														height: "40px",
														borderRadius: "6px",
														marginRight: "12px",
													}}
												/>
											)}
											{!loading && (
												<div
													className="list-cinema-box-logo"
													style={{
														background: `url(${item.image})`,
													}}></div>
											)}
											{loading && (
												<LoadingSkeleton
													style={{
														width: "100%",
														height: "24px",
													}}
												/>
											)}
											{!loading && (
												<>
													<div className="list-cinema-box-name">
														{item.name}
													</div>
													<i class="fas fa-chevron-right"></i>
												</>
											)}
										</div>
									);
								})}
							</div>
							<div className="col-7 list-showtime">
								<div className="list-showtime-cinema-box">
									<div className="cinema-box-content">
										<div
											className="showtime-cinema-box-logo"
											style={{
												background: `url(${background})`,
											}}></div>
										<div className="showtime-cinema-box-info">
											<div className="showtime-cinema-box-name">
												Lịch chiếu phim {nameCinemaShowtime}
											</div>
											<div className="showtime-cinema-box-location">
												<i class="fas fa-map-marker-alt"></i>
												{location}
											</div>
										</div>
									</div>
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
												{dataShow &&
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
																			item.showtime.length >
																				0 &&
																			item.showtime.map(
																				(it) => {
																					console.log(
																						nameCinemaShowtime
																					);
																					it.cinemaId =
																						nameCinemaShowtime;
																					it.tradeMarkId =
																						tradeMark;
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
																							{
																								it.startTime
																							}
																						</div>
																					);
																				}
																			)}
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
					</div>
				</div>
				<BookingModal
					isOpenModal={isOpenModal}
					closeBookingModal={this.closeBookingModal}
					dataScreen={dataScreen}
					dataShowtime={dataShowtime}
					image={this.state.image}
				/>
			</>
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
		fetchSeatsByShowtime: (data) =>
			dispatch(actions.fetchSeatsByShowtime(data)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ShowtimeSection)
);
