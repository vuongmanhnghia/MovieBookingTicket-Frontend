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
			showtimeDate: "",
			showtimeCinema: "",
			showtimeData: [],
		};
	}

	componentDidMount() {
		this.setState({
			showtimeDate: new Date().getDate(),
		});
		this.props.fetchAllMovies();
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

	handleViewDetailMovie = async (item) => {
		await this.props.history.push(`/cinema/detail-movie/${item.id}`);
		await this.props.history.push(`/detail-movie/${item.id}`);
		await this.props.fetchDetailMovie(item.id);

		console.log(this.props);
	};

	render() {
		let allMovies = this.props.allMovies;
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
				<div className="more-movie-container col-4">
					<div className="more-movie-title">Phim đang chiếu</div>
					<div className="more-movie-content">
						{allMovies &&
							allMovies.length > 0 &&
							allMovies.map((item) => {
								let imageBase64 = new Buffer(
									item.image,
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
													this.handleViewDetailMovie(item)
												}></div>
											<div className="more-box-movie-content">
												<div className="more-box-movie-title">
													{item.title.length < 40
														? item.title
														: `${item.title.slice(0, 37)}...`}
												</div>
												<div className="more-box-movie-genre">
													{item.genre.length < 25
														? item.genre
														: `${item.genre.slice(0, 28)}...`}
												</div>
												<div className="more-box-movie-rating">
													<i class="fas fa-star"></i>
													{item.rating}
												</div>
											</div>
										</div>
									</>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		allMovies: state.movie.allMovies,
		detailMovie: state.movie.detailMovie,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
		fetchDetailMovie: (id) => dispatch(actions.fetchDetailMovie(id)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ShowtimeData)
);
