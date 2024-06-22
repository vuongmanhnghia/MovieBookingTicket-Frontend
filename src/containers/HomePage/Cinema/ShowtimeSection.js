import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailCinema.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";
import { getShowtimeByCinemaService } from "../../../services/showtimeService";
class DetailCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailCinema: [],
			tradeMark: "",
			image: "",
			nameCinemaShowtime: "",
			location: "",
			maxDate: [1, 2, 3, 4, 5, 6, 7],

			dataShow: [],
			showtimeCinema: "",
			showtimeDate: "",
		};
	}

	async componentDidMount() {
		if (this.props.id) {
			let id = this.props.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				console.log(response.data);
				this.setState({
					detailCinema: response.data,
				});
			}
			this.setState({
				tradeMark: this.state.detailCinema[0].tradeMark,
				image: this.state.detailCinema[0].image,
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
	}

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
		let {
			detailCinema,
			tradeMark,
			image,
			nameCinemaShowtime,
			location,
			maxDate,
			dataShow,
		} = this.state;
		return (
			<>
				<div className="cinema-detail-showtime-container">
					<div className="cinema-detail-showtime-content">
						<div className="cinema-detail-showtime-title">
							Lịch chiếu phim tại {tradeMark}
						</div>
						<div className="detail-showtime-content row">
							<div className="null col-12"></div>
							<div className="col-5 list-cinema">
								{detailCinema.map((item, index) => {
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
												background: `url(${image})`,
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
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
