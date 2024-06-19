import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailCinema.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";
import { getShowtimeByCinemaService } from "../../../services/showtimeService";
import { get } from "lodash";
import Footer from "../Section/Footer";
class DetailCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailCinema: [],
			tradeMark: "",
			name: "",
			rating: "",
			image: "",
			background: "",
			slogan: "",

			nameCinemaShowtime: "",
			location: "",

			maxDate: [1, 2, 3, 4, 5, 6, 7],

			dataShow: [],
			showtimeCinema: "",
			showtimeDate: "",
		};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.props.match.params.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				this.setState({
					detailCinema: response.data,
				});
			}
			this.setState({
				tradeMark: this.state.detailCinema[0].tradeMark,
				rating: this.state.detailCinema[0].rating,
				image: this.state.detailCinema[0].image,
				background: this.state.detailCinema[0].background,
			});
			if (this.state.tradeMark === "Lotte Cinema") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim từ Hàn Quốc",
				});
			}
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
	}

	// handleChaneBoxCinema = async (item) => {
	// 	let dataShow = (await getShowtimeByCinemaService(item.name)).data;
	// 	await this.setState({
	// 		dataShow: dataShow,
	// 	});

	// 	let activeCinema = document.querySelector(".cinema-box-content");
	// 	activeCinema.style = "opacity: 1";
	// 	this.setState({
	// 		nameCinemaShowtime: item.name,
	// 		location: item.location,
	// 	});
	// };

	handleChaneBoxCinema = async (item) => {
		await this.setState({
			showtimeCinema: item.name,
		});
		this.setState({
			dataShow: await this.handleView(),
		});

		let activeCinema = document.querySelector(".cinema-box-content");
		activeCinema.style = "opacity: 1";
		this.setState({
			nameCinemaShowtime: item.name,
			location: item.location,
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
		} else if (this.state.showtimeDate === "") {
			return dataShow;
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

	render() {
		return (
			<>
				<HomeNavigation />
				<div className="cinema-detail-container">
					<div
						className="cinema-detail-content"
						style={{
							backgroundImage: `url(${this.state.background})`,
						}}>
						<div className="cinema-detail-header">
							<div
								className="cinema-detail-header-logo"
								style={{
									background: `url(${this.state.image})`,
								}}></div>
							<div className="cinema-detail-header-content">
								<div className="cinema-detail-header-title">
									{this.state.tradeMark}
								</div>
								<div className="cinema-detail-header-slogan">
									{this.state.slogan}
								</div>
								<div className="cinema-detail-header-rating">
									<i class="fas fa-star"></i>
									{this.state.rating} / 5
								</div>
								<div className="cinema-detail-header-location">
									<i class="fas fa-map-marker-alt"></i>
									{this.state.detailCinema.length} cửa hàng trong hệ
									thống
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="cinema-detail-showtime-container">
					<div className="cinema-detail-showtime-content">
						<div className="cinema-detail-showtime-title">
							Lịch chiếu phim tại {this.state.tradeMark}
						</div>
						<div className="detail-showtime-content row">
							<div className="null col-12"></div>
							<div className="col-5 list-cinema">
								{this.state.detailCinema.map((item, index) => {
									return (
										<div
											className="list-cinema-box"
											onClick={() =>
												this.handleChaneBoxCinema(item)
											}>
											<div
												className="list-cinema-box-logo"
												style={{
													background: `url(${item.image})`,
												}}></div>
											<div className="list-cinema-box-name">
												{item.name}
											</div>
											<i class="fas fa-chevron-right"></i>
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
												background: `url(${this.state.image})`,
											}}></div>
										<div className="showtime-cinema-box-info">
											<div className="showtime-cinema-box-name">
												Lịch chiếu phim{" "}
												{this.state.nameCinemaShowtime}
											</div>
											<div className="showtime-cinema-box-location">
												<i class="fas fa-map-marker-alt"></i>
												{this.state.location}
											</div>
										</div>
									</div>
									<div className="list-showtime-date">
										{this.state.maxDate &&
											this.state.maxDate.length > 0 &&
											this.state.maxDate.map((item, index) => {
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
									<div className="list-showtime-content">
										<div className="scrollbar">
											<div className="scrollbar-inner">
												{this.state.dataShow &&
													this.state.dataShow.length > 0 &&
													this.state.dataShow.map((item) => {
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
																				(item) => {
																					return (
																						<div className="box-showtime-startTime">
																							{
																								item.startTime
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
				<Footer />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
