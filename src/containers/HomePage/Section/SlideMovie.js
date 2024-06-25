import React, { Component } from "react";
import { connect } from "react-redux";
import "./SlideMovie.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom";
import TrailerMovie from "../Movie/TrailerMovie";

// Import css files

class SlideMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrMovies: [],
			isOpenModal: false,
			dataMovie: {},
		};
	}

	componentDidMount() {
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
		await this.props.history.push(`/detail-movie/${item.id}`);
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

	render() {
		let { isOpenModal, dataMovie, arrMovies } = this.state;
		return (
			<div className="movie-section-container">
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
										console.log("item", item);
										return (
											<div className="box-slide-customize">
												<div className="box-image-movie">
													<div
														onClick={() =>
															this.handleViewDetailMovie(item)
														}
														className="bg-image"
														style={{
															backgroundImage: `url(${item.image})`,
														}}
													/>
													<i
														class="far fa-play-circle"
														onClick={() =>
															this.handleViewTraileMovie(item)
														}></i>
												</div>
												<div className="box-movie-text">
													<div className="title-movie">
														{item.title.length < 20
															? item.title
															: `${item.title.slice(0, 20)}...`}
													</div>
													<div className="category">
														{item.genre.length < 25
															? item.genre
															: `${item.genre.slice(0, 28)}...`}
													</div>
												</div>
												<div className="rate">
													<i className="fas fa-star"></i>{" "}
													{item.rating}
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

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SlideMovie)
);
