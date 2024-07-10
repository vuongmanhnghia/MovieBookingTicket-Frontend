import React, { Component } from "react";
import { connect } from "react-redux";
import "./ShowtimeData.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import BookingModal from "./BookingModal";
import moment from "moment";
import LoadingSkeleton from "../../../containers/HomePage/LoadingSkeleton";
import { set } from "lodash";

// Import css files

class ShowtimeData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showtimeData: [],
			allTradeMarks: [],
			isOpenModal: false,
			dataShowtime: {},
			dataScreen: {},
			imageTradeMark: "",

			loading: true,
			loadingShowtime: true,
		};
	}

	closeLoading = (countdown) => {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, countdown);
	};

	closeLoadingShowtime = (countdown) => {
		setTimeout(() => {
			this.setState({
				loadingShowtime: false,
			});
		}, countdown);
	};

	async componentDidMount() {
		this.closeLoading(500);
		this.closeLoadingShowtime(1000);
		await this.props.fetchAllMovies();
		setTimeout(() => {
			this.viewShowtimeFirstTime();
			let activeDate = document.querySelectorAll(".box-date");
			activeDate.forEach((item) => {
				item.addEventListener("click", () => {
					document
						.querySelectorAll(".box-date")
						.forEach((item) => item.classList.remove("active"));
					item.classList.add("active");
				});
			});

			let activeCinema = document.querySelectorAll("div.box-cinema");
			let activeLogo = document.querySelectorAll("div.logo-cinema");
			let activeTradeMark = document.querySelectorAll(
				"div.tradeMark-cinema"
			);
			activeCinema.forEach((item, index) => {
				item.addEventListener("click", () => {
					document
						.querySelectorAll("div.logo-cinema")
						.forEach((item) => item.classList.remove("active"));
					document
						.querySelectorAll("div.tradeMark-cinema")
						.forEach((item) => item.classList.remove("active-tradeMark"));
					activeLogo[index].classList.add("active");
					activeTradeMark[index].classList.add("active-tradeMark");
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
		}, 500);
	}

	handleChangeDate = async (date) => {
		this.setState({
			loadingShowtime: true,
		});
		setTimeout(() => {
			this.setState({
				loadingShowtime: false,
			});
		}, 200);
		await this.props.handleGetDateSelected(
			moment().add(date, "days").format("DD/MM/YYYY")
		);
	};

	handleChangeCinema = async (item) => {
		this.setState({
			loadingShowtime: true,
			imageTradeMark: item.image,
		});
		setTimeout(() => {
			this.setState({
				loadingShowtime: false,
			});
		}, 200);
		await this.props.handleGetTradeMarkSelected(item.tradeMark);
	};

	handleViewDetailMovie = async (item) => {
		this.setState({
			loadingShowtime: true,
		});
		setTimeout(() => {
			this.setState({
				loadingShowtime: false,
			});
		}, 500);

		this.props.handleNewTabMovie(item);
		this.setState({
			showtimeData: [],
		});
	};

	handleClickBooking = async (item) => {
		await this.props.fetchSeatsByShowtime(item);
		await this.setState({
			isOpenModal: true,
			dataShowtime: item,
			dataScreen: this.props.screenData,
		});
		await this.getTotalBooking();
	};

	closeBookingModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	viewShowtimeFirstTime = async () => {
		this.handleChangeCinema(this.props.allTradeMarks[0]);
	};

	getTotalBooking = async () => {
		await this.props.fetchBookingByCinemaMovieScreenDateTime({
			cinema: this.state.dataShowtime.cinemaId,
			movie: this.state.dataShowtime.movieId,
			screen: this.state.dataShowtime.screenId,
			date: this.state.dataShowtime.startDate,
			time: this.state.dataShowtime.startTime,
		});
	};

	render() {
		let {
			allMovies,
			image,
			title,
			allTradeMarks,
			showtimeData,
			totalBooking,
		} = this.props;
		let {
			isOpenModal,
			dataShowtime,
			dataScreen,
			imageTradeMark,
			loading,
			loadingShowtime,
		} = this.state;
		return (
			<>
				<div className="movie-detail-showtimeData-container row">
					<div className="movie-detail-showtimeData-content col-8">
						<div className="showtimeData-content-title">
							{title
								? `Lịch chiếu ${title}`
								: "Xin lỗi, phim hiện chưa có xuất chiếu."}
						</div>
						<div className="showtimeData-container">
							<div className="showtimeData-date">
								{new Array(7).fill("vmn").map((item, index) => {
									let date = new Date();
									if (index === 0) {
										return (
											<div
												className="box-date active"
												onClick={() =>
													this.handleChangeDate(index)
												}>
												{date.getDate() + index}
											</div>
										);
									} else {
										return (
											<div
												className="box-date"
												onClick={() =>
													this.handleChangeDate(index)
												}>
												{date.getDate() + index}
											</div>
										);
									}
								})}
							</div>
							<div className="showtimeData-cinema">
								{loading && (
									<LoadingSkeleton
										style={{
											width: "100%",
											height: "100%",
											borderRadius: "6px",
										}}
									/>
								)}
								{!loading &&
									allTradeMarks &&
									allTradeMarks.length > 0 &&
									allTradeMarks.map((item, index) => {
										if (index === 0) {
											return (
												<div
													className="box-cinema "
													onClick={() =>
														this.handleChangeCinema(item)
													}>
													<div
														className="logo-cinema active"
														style={{
															background: `url(${item.image})`,
														}}></div>
													<div className="tradeMark-cinema active-tradeMark">
														{item.tradeMark < 7
															? item.tradeMark
															: `${item.tradeMark.slice(
																	0,
																	7
															  )}...`}
													</div>
												</div>
											);
										} else {
											return (
												<div
													className="box-cinema"
													onClick={() =>
														this.handleChangeCinema(item)
													}>
													<div
														className="logo-cinema"
														style={{
															background: `url(${item.image})`,
														}}></div>
													<div className="tradeMark-cinema">
														{item.tradeMark < 7
															? item.tradeMark
															: `${item.tradeMark.slice(
																	0,
																	7
															  )}...`}
													</div>
												</div>
											);
										}
									})}
							</div>
							<div className="showtimeData-showtime">
								{loadingShowtime && (
									<LoadingSkeleton
										style={{
											width: "683.693px",
											height: "960px",
											borderRadius: "6px",
											margin: "auto",
										}}
									/>
								)}
								{!loadingShowtime && (
									<div className="scrollbar">
										<div className="scrollbar-inner">
											{showtimeData &&
												showtimeData.length > 0 &&
												showtimeData.map((itemShowtime) => {
													return (
														<div className="box-showtime-cinema">
															<div className="cinema-info">
																<div
																	className="logo-cinema"
																	style={{
																		background: `url(${imageTradeMark})`,
																	}}></div>
																<div className="name-location-box">
																	<div className="name-cinema">
																		{itemShowtime.cinema.name}
																	</div>
																	<div className="location-cinema">
																		{
																			itemShowtime.cinema
																				.location
																		}
																	</div>
																</div>
															</div>
															<div className="list-box-showtime">
																{itemShowtime.showtime &&
																	itemShowtime.showtime
																		.length > 0 &&
																	itemShowtime.showtime.map(
																		(item, index) => {
																			return (
																				<div
																					className="box-showtime"
																					onClick={() =>
																						this.handleClickBooking(
																							item
																						)
																					}>
																					{item.startTime}
																				</div>
																			);
																		}
																	)}
															</div>
														</div>
													);
												})}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="more-movie-container col-4">
						<div className="more-movie-title">Phim đang chiếu</div>
						<div className="more-movie-content">
							{allMovies &&
								allMovies.length > 0 &&
								allMovies.map((item, index) => {
									if (index >= 10) {
										return;
									}
									return (
										<>
											<div className="divider"></div>
											<div className="more-box-movie">
												<div
													className="more-box-movie-image"
													style={{
														backgroundImage: `url(${
															allMovies[
																allMovies.length - index - 1
															].image
														})`,
													}}
													onClick={() =>
														this.handleViewDetailMovie(
															allMovies[
																allMovies.length - index - 1
															]
														)
													}>
													<div className="order-movie">
														{index + 1}
													</div>
												</div>
												<div className="more-box-movie-content">
													<div
														className="more-box-movie-title"
														onClick={() =>
															this.handleViewDetailMovie(
																allMovies[
																	allMovies.length - index - 1
																]
															)
														}>
														{allMovies[
															allMovies.length - index - 1
														].title.length < 40
															? allMovies[
																	allMovies.length - index - 1
															  ].title
															: `${allMovies[
																	allMovies.length - index - 1
															  ].title.slice(0, 37)}...`}
													</div>
													<div className="more-box-movie-genre">
														{allMovies[
															allMovies.length - index - 1
														].genre.length < 25
															? allMovies[
																	allMovies.length - index - 1
															  ].genre
															: `${allMovies[
																	allMovies.length - index - 1
															  ].genre.slice(0, 28)}...`}
													</div>
													<div className="more-box-movie-rating">
														<i class="fas fa-star"></i>
														{
															allMovies[
																allMovies.length - index - 1
															].rating
														}
													</div>
												</div>
											</div>
										</>
									);
								})}
						</div>
					</div>
				</div>
				<BookingModal
					isOpenModal={isOpenModal}
					closeBookingModal={this.closeBookingModal}
					dataScreen={dataScreen}
					dataShowtime={dataShowtime}
					image={image}
					totalBooking={totalBooking}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		allMovies: state.movie.allMovies,
		detailMovie: state.movie.detailMovie,
		screenData: state.showtime.seatsByShowtime,
		totalBooking: state.booking.totalBooking,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
		fetchDetailMovie: (id) => dispatch(actions.fetchDetailMovie(id)),
		fetchSeatsByShowtime: (data) =>
			dispatch(actions.fetchSeatsByShowtime(data)),
		fetchBookingByCinemaMovieScreenDateTime: (data) => {
			dispatch(actions.fetchBookingByCinemaMovieScreenDateTime(data));
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ShowtimeData)
);
