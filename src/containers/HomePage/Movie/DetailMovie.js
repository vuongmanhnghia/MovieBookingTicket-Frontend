import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailMovie.scss";
import { getDetailMovieService } from "../../../services/movieService";
import ShowtimeData from "./ShowtimeData";
import { withRouter } from "react-router-dom";
import TrailerMovie from "./TrailerMovie";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Footer from "../Section/Footer";
import * as actions from "../../../store/actions";
import moment from "moment";
import LoadingSkeleton from "../LoadingSkeleton";
class DetailMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailMovie: {},
			title: "",
			description: "",
			rating: "",
			duration: "",
			releaseDate: "",
			genre: "",
			director: "",
			image: "",
			background: "",
			trailer: "",
			showtimeData: [],
			newDescription: "",

			isOpenModal: false,

			nameMovie: "",
			tradeMarkSelected: "",
			dateSelected: moment().format("DD/MM/YYYY"),

			allTradeMarks: [],
			loading: true,
		};
	}
	async componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 500);
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.name
		) {
			let name = this.props.match.params.name;
			let response = await getDetailMovieService(name);
			await this.props.fetchAllTradeMarks();
			if (response && response.errCode === 0) {
				this.setState({
					nameMovie: name,
					detailMovie: response.data,
					allTradeMarks: this.props.allTradeMarks,
					tradeMarkSelected: this.props.allTradeMarks[0].tradeMark,
				});
			}
			this.setState({
				title: this.state.detailMovie.title,
				description: this.state.detailMovie.description,
				rating: this.state.detailMovie.rating,
				duration: this.state.detailMovie.duration,
				releaseDate: this.state.detailMovie.releaseDate,
				genre: this.state.detailMovie.genre,
				director: this.state.detailMovie.director,
				image: this.state.detailMovie.image,
				background: this.state.detailMovie.background,
				trailer: this.state.detailMovie.trailer,
				date: new Date(this.state.releaseDate),
				newDescription: String(this.state.detailMovie.description),
			});
		}
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.match.params.name !== this.props.match.params.name) {
			let name = this.props.match.params.name;
			let response = await getDetailMovieService(name);
			if (response && response.errCode === 0) {
				this.setState({
					nameMovie: name,
					detailMovie: response.data,
				});
			}
			this.handleDataShowtime();
			this.setState({
				title: this.state.detailMovie.title,
				description: this.state.detailMovie.description,
				rating: this.state.detailMovie.rating,
				duration: this.state.detailMovie.duration,
				releaseDate: this.state.detailMovie.releaseDate,
				genre: this.state.detailMovie.genre,
				director: this.state.detailMovie.director,
				image: this.state.detailMovie.image,
				background: this.state.detailMovie.background,
				trailer: this.state.detailMovie.trailer,
				date: new Date(this.state.releaseDate),
				newDescription: String(this.state.detailMovie.description),
			});
		}
	}

	handleNewTabMovie = async (item) => {
		this.hadleGetNameMovie(item.title);
		await this.props.history.push(`/detail-movie/${item.title}`);
		if (this.prevProps !== this.props) {
			if (
				this.props.match &&
				this.props.match.params &&
				this.props.match.params.name
			) {
				let name = this.props.match.params.name;
				let response = await getDetailMovieService(name);
				if (response && response.errCode === 0) {
					await this.setState({
						detailMovie: response.data,
					});
				}
				await this.setState({
					title: this.state.detailMovie.title,
					description: this.state.detailMovie.description,
					rating: this.state.detailMovie.rating,
					duration: this.state.detailMovie.duration,
					releaseDate: this.state.detailMovie.releaseDate,
					genre: this.state.detailMovie.genre,
					director: this.state.detailMovie.director,
					image: this.state.detailMovie.image,
					background: this.state.detailMovie.background,
					trailer: this.state.detailMovie.trailer,
					date: new Date(this.state.releaseDate),
					newDescription: String(this.state.detailMovie.description),
				});
			}
		}
	};

	handleClickBooking = async (item) => {
		await this.props.fetchSeatsByShowtime(item);
	};

	closeBookingModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	handleViewTraileMovie = async (item) => {
		this.setState({
			isOpenModal: true,
			dataMovie: item,
		});
	};

	hadleGetNameMovie = async (name) => {
		await this.setState({
			nameMovie: name,
		});
		await this.handleDataShowtime();
	};

	handleGetTradeMarkSelected = async (tradeMark) => {
		await this.setState({
			tradeMarkSelected: tradeMark,
		});
		await this.handleDataShowtime();
	};

	handleGetDateSelected = async (date) => {
		await this.setState({
			dateSelected: date,
		});
		await this.handleDataShowtime();
	};

	handleDataShowtime = async () => {
		await this.props.fetchShowtimeByCinemaAndDateAndMovieService(
			this.state.tradeMarkSelected,
			this.state.dateSelected,
			this.state.nameMovie
		);
		this.setState({
			showtimeData: this.props.showtimesByCDM,
		});
	};

	render() {
		let { image, title, showtimeData, background, loading } = this.state;
		let releaseDate = this.state.detailMovie.releaseDate;
		let date = new Date(releaseDate);
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<div className="movie-detail-container">
					{loading && (
						<LoadingSkeleton
							className="movie-detail-content"
							style={{
								background: "#111",
								height: "480px",
								width: "100%",
							}}
						/>
					)}
					{!loading && (
						<div
							className="movie-detail-content"
							style={{ background: `url(${background})` }}>
							<div className="box-movie-detail">
								<div className="box-movie-detail-image">
									<div
										className="movie-detail-image"
										style={{
											backgroundImage: `url(${image})`,
										}}
									/>
									<div className="open-trailer-movie">
										<i
											class="far fa-play-circle"
											onClick={() =>
												this.handleViewTraileMovie(
													this.state.detailMovie
												)
											}></i>
									</div>
								</div>
								<div className="box-movie-detail-content">
									<div className="movie-detail-title">
										{this.state.title}
									</div>
									<div className="box-releaseYear-duration">
										<div className="releaseYear">
											{date.getFullYear()}
										</div>{" "}
										&ndash;
										<div className="duration">{`${this.state.duration} phút`}</div>
									</div>
									<div className="movie-detail-rating">
										<i class="fas fa-star"></i>
										{this.state.rating}
									</div>
									<div className="movie-detail-director">
										{this.state.director}
									</div>
									<div className="description-title">Nội dung</div>
									<p className="movie-detail-description">
										{this.state.newDescription.length > 200
											? `${this.state.newDescription.substring(
													0,
													200
											  )}...`
											: this.state.newDescription}
									</p>
									<div className="releaseDate-genre">
										<div className="box-releaseDate">
											<div className="box-releaseDate-title">
												Ngày khởi chiếu
											</div>
											<div className="releaseDate">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</div>
										</div>
										<div className="box-genre">
											<div className="box-genre-title">Thể loại</div>
											<div className="genre">{this.state.genre}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
				<TrailerMovie
					isOpenModal={this.state.isOpenModal}
					closeBookingModal={this.closeBookingModal}
					dataMovie={this.state.dataMovie}
				/>
				<ShowtimeData
					allTradeMarks={this.state.allTradeMarks}
					handleGetTradeMarkSelected={this.handleGetTradeMarkSelected}
					handleGetDateSelected={this.handleGetDateSelected}
					showtimeData={showtimeData}
					title={title}
					handleNewTabMovie={this.handleNewTabMovie}
				/>
				<Footer />
			</CustomScrollbars>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		allTradeMarks: state.cinema.allTradeMarks,
		showtimesByCDM: state.showtime.showtimesByCDM,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
		fetchShowtimeByCinemaAndDateAndMovieService: (
			tradeMark,
			date,
			nameMovie
		) =>
			dispatch(
				actions.fetchShowtimeByCinemaAndDateAndMovieService(
					tradeMark,
					date,
					nameMovie
				)
			),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DetailMovie)
);
