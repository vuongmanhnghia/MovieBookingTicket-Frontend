import React, { Component } from "react";
import { connect } from "react-redux";
import "./Slide.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom";
import TrailerMovie from "../Movie/TrailerMovie";
import LoadingSkeleton from "../LoadingSkeleton";
// Import css files

class Slide extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrMovies: [],
			isOpenModal: false,
			dataMovie: {},
			loading: true,
		};
	}

	componentDidMount() {
		this.closeLoading(500);
		this.props.loadTopMovies();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.topMovies !== this.props.topMovies) {
			this.setState({
				arrMovies: this.props.topMovies,
			});
		}
	}

	closeBookingModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	handleViewDetailMovie = async (item) => {
		await this.props.history.push(`/detail-movie/${item.title}`);
	};

	handleClickBooking = async (item) => {
		await this.props.fetchSeatsByShowtime(item);
	};

	closeTrailerModal = () => {
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

	closeLoading = (countdown) => {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, countdown);
	};

	render() {
		let { isOpenModal, dataMovie, arrMovies, loading } = this.state;
		return (
			<div className="background-movie-container">
				<div className="movie-section-content">
					<div className="movie-section-title">
						<h2>Phim đang chiếu</h2>
					</div>
					<div className="movie-section-slide-container">
						<div className="movie-section-slide-content">
							<Slider {...this.props.settings}>
								{arrMovies &&
									arrMovies.length > 0 &&
									arrMovies.map((item, index) => {
										return (
											<div className="box-slide-customize">
												<div className="box-image-movie">
													{loading && (
														<LoadingSkeleton
															style={{
																width: "100%",
																height: "100%",
															}}
														/>
													)}
													{!loading && (
														<>
															<div
																onClick={() =>
																	this.handleViewDetailMovie(
																		item
																	)
																}
																className="bg-image"
																style={{
																	backgroundImage: `url(${item.image})`,
																}}></div>
															<i
																class="far fa-play-circle"
																onClick={() =>
																	this.handleViewTraileMovie(
																		item
																	)
																}></i>
														</>
													)}
												</div>
												<div
													className="box-movie-text"
													onClick={() =>
														this.handleViewDetailMovie(item)
													}>
													<div className="order-slide">
														{index + 1}
													</div>
													<div className="title-movie">
														{loading && (
															<LoadingSkeleton
																style={{
																	width: "185px",
																	height: "18.75px",
																	borderRadius: "4px",
																}}
															/>
														)}
														{!loading && (
															<>
																{item.title.length < 20
																	? item.title
																	: `${item.title.slice(
																			0,
																			17
																	  )}...`}
															</>
														)}
													</div>
													<div className="category">
														{loading && (
															<LoadingSkeleton
																style={{
																	width: "185px",
																	height: "16px",
																	borderRadius: "4px",
																}}
															/>
														)}
														{!loading && (
															<>
																{item.genre.length < 25
																	? item.genre
																	: `${item.genre.slice(
																			0,
																			23
																	  )}...`}
															</>
														)}
													</div>
												</div>
												<div className="rate">
													{loading && (
														<LoadingSkeleton
															style={{
																width: "185px",
																height: "18.75px",
																borderRadius: "4px",
															}}
														/>
													)}
													{!loading && (
														<>
															<i className="fas fa-star"></i>{" "}
															{item.rating}
														</>
													)}
												</div>
											</div>
										);
									})}
							</Slider>
						</div>
					</div>
				</div>
				<TrailerMovie
					isOpenModal={isOpenModal}
					closeBookingModal={this.closeTrailerModal}
					dataMovie={dataMovie}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		topMovies: state.movie.topMovies,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTopMovies: () => dispatch(actions.fetchTopMovies()),
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Slide));
