import React, { Component } from "react";
import { connect } from "react-redux";
import "./ShowtimeData.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";
import BookingModal from "./BookingModal";
// Import css files

class ShowtimeData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showtimeDate: "",
			showtimeCinema: "",
			showtimeData: [],
			allTradeMarks: [],

			isOpenModal: false,

			dataShowtime: {},
			dataScreen: {},

			imageTradeMark: "",
		};
	}

	async componentDidMount() {
		this.handleView();
		await this.props.fetchAllTradeMarks();
		// lọc các phần tử giống nhau trong allTrademarks
		let allTradeMarks = this.filterTradeMarks(this.props.allTradeMarks);
		this.setState({
			allTradeMarks: allTradeMarks,
		});
		await this.props.fetchAllMovies();
		await this.handleView();

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
		let activeTradeMark = document.querySelectorAll("div.tradeMark-cinema");
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
	}

	filterTradeMarks(items) {
		const seenNames = new Set();
		return items.filter((item) => {
			if (seenNames.has(item.tradeMark)) {
				return false; // Bỏ qua các đối tượng có tên trùng
			} else {
				seenNames.add(item.tradeMark); // Lưu lại tên đã gặp
				return true; // Giữ lại đối tượng đầu tiên có tên này
			}
		});
	}

	componentDidUpdate(prevProps) {}

	handleChangeDate = async (date) => {
		await this.setState({
			showtimeDate: await date,
		});
		await this.setState({
			showtimeData: await this.handleView(),
		});
	};

	handleChangeCinema = async (tradeMark) => {
		await this.state.allTradeMarks.map((item, index) => {
			if (item.tradeMark === tradeMark) {
				this.setState({
					imageTradeMark: item.image,
				});
			}
		});
		await this.setState({
			showtimeCinema: await tradeMark,
		});
		await this.setState({
			showtimeData: await this.handleView(),
		});
	};

	handleView = async () => {
		let dataView = this.props.showtimeData;
		let date = this.state.showtimeDate;
		let tradeMark = this.state.showtimeCinema;
		let arrResult = [];

		await dataView.map((item) => {
			if (
				new Date(item.startDate).getDate() === date &&
				item.tradeMarkId === tradeMark
			) {
				arrResult.push(item);
			} else if (date === "" && item.tradeMarkId === tradeMark) {
				arrResult.push(item);
			}
			// else if (
			// 	new Date(item.startDate).getDate() === date &&
			// 	tradeMark === ""
			// ) {
			// 	arrResult.push(item);
			// }
		});

		let result = this.groupCinema(arrResult);
		return result;
	};

	groupCinema(arrShowtime) {
		console.log(arrShowtime);
		const groups = arrShowtime.reduce((acc, item) => {
			const group = acc[item.cinemaId] || [];
			group.push(item);
			acc[item.cinemaId] = group;
			return acc;
		}, {});

		return Object.keys(groups).map((cinemaId) => ({
			cinemaId,
			arrShowtime: groups[cinemaId],
		}));
	}

	handleViewDetailMovie = async (item) => {
		this.props.handleNewTabMovie(item);
		document
			.querySelectorAll(".box-date")
			.forEach((item) => item.classList.remove("active"));
		document
			.querySelectorAll("div.logo-cinema")
			.forEach((item) => item.classList.remove("active"));
		this.setState({
			showtimeData: [],
		});
	};

	handleClickBooking = async (item) => {
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

	render() {
		let { allMovies, image, title } = this.props;
		let {
			isOpenModal,
			dataShowtime,
			dataScreen,
			allTradeMarks,
			// showtimeData,
			imageTradeMark,
		} = this.state;
		let maxDate = [1, 2, 3, 4, 5, 6, 7];
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
								{allTradeMarks &&
									allTradeMarks.length > 0 &&
									allTradeMarks.map((item) => {
										return (
											<div
												className="box-cinema"
												onClick={() =>
													this.handleChangeCinema(item.tradeMark)
												}>
												<div
													className="logo-cinema"
													style={{
														background: `url(${item.image})`,
													}}></div>
												<div className="tradeMark-cinema">
													{item.tradeMark < 7
														? item.tradeMark
														: `${item.tradeMark.slice(0, 7)}...`}
												</div>
											</div>
										);
									})}
							</div>
							<div className="showtimeData-showtime">
								{this.state.showtimeData.map((item) => {
									return (
										<div className="box-showtime-cinema">
											<div className="cinema-info">
												<div
													className="logo-cinema"
													style={{
														background: `url(${imageTradeMark})`,
													}}></div>
												<div className="name-cinema">
													{item.cinemaId}
												</div>
											</div>
											<div className="list-box-showtime">
												{item.arrShowtime &&
													item.arrShowtime.length > 0 &&
													item.arrShowtime.map((item, index) => {
														return (
															<div
																className="box-showtime"
																onClick={() =>
																	this.handleClickBooking(item)
																}>
																{item.startTime}
															</div>
														);
													})}
											</div>
										</div>
									);
								})}
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

									let imageBase64 = new Buffer(
										allMovies[allMovies.length - index - 1].image,
										"base64"
									).toString("binary");

									return (
										<>
											<div className="divider"></div>
											<div className="more-box-movie">
												<div
													className="more-box-movie-image"
													style={{
														backgroundImage: `url(${imageBase64})`,
													}}
													onClick={() =>
														this.handleViewDetailMovie(
															allMovies[
																allMovies.length - index - 1
															]
														)
													}></div>
												<div className="more-box-movie-content">
													<div className="more-box-movie-title">
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
		allTradeMarks: state.cinema.allTradeMarks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
		fetchDetailMovie: (id) => dispatch(actions.fetchDetailMovie(id)),
		fetchSeatsByShowtime: (data) =>
			dispatch(actions.fetchSeatsByShowtime(data)),
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ShowtimeData)
);
