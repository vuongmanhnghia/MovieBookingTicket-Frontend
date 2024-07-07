import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ShowtimeSection.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";
// import { getShowtimeByCinemaService } from "../../../services/showtimeService";
import { getShowtimeByCinemaAndDateService } from "../../../services/showtimeService";
import BookingModal from "../Movie/BookingModal";
import * as actions from "../../../store/actions";
import LoadingSkeleton from "../LoadingSkeleton";
import moment from "moment";
import { set } from "lodash";
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

			dataShow: [],
			showtimeCinema: "",
			showtimeDate: moment().format("DD/MM/YYYY"),

			isOpenModal: false,
			dataShowtime: {},
			dataScreen: {},

			loading: true,
			loaddingShowtime: false,
		};
	}

	async componentDidMount() {
		this.closeLoading(700);
		if (this.props.id) {
			let id = this.props.id;
			let response = await getDetailCinemaService(id);
			await this.setState({
				detailCinema: response.data,
			});
			setTimeout(() => {
				this.setState({
					background: this.state.detailCinema[0].image,
				});
			}, 500);
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

	handleChangeDate = async (index) => {
		await this.setState({
			showtimeDate: moment().add(index, "days").format("DD/MM/YYYY"),
		});
		this.setState({
			dataShow: await this.handleView(),
		});
	};

	handleView = async () => {
		this.setState({
			loaddingShowtime: true,
		});
		setTimeout(() => {
			this.setState({
				loaddingShowtime: false,
			});
		}, 200);
		let data = (
			await getShowtimeByCinemaAndDateService(
				this.state.nameCinemaShowtime,
				this.state.showtimeDate
			)
		).data;

		return data;
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
		console.log(this.props.screenData);
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
			dataShow,
			isOpenModal,
			dataScreen,
			dataShowtime,
			loading,
			loaddingShowtime,
		} = this.state;
		return (
			<>
				<div className="cinema-detail-showtime-container">
					<div className="cinema-detail-showtime-content">
						<div className="detail-showtime-content row">
							<div className="null col-12"></div>
							<div className="col-5 list-cinema">
								<div className="scrollbar">
									<div className="scrollbar-inner">
										{detailCinema &&
											detailCinema.length > 0 &&
											detailCinema.map((item, index) => {
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
								</div>
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
									<div className="list-showtime-content">
										{loaddingShowtime && (
											<LoadingSkeleton
												style={{ width: "100%", height: "100%" }}
											/>
										)}
										{!loaddingShowtime &&
											dataShow &&
											dataShow.length > 0 && (
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
																					item.showtime
																						.length > 0 &&
																					item.showtime.map(
																						(it) => {
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
											)}
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
