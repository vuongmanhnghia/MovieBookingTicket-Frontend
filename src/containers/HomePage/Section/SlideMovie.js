import React, { Component } from "react";
import { connect } from "react-redux";
import "./SlideMovie.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

// Import css files

class SlideMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrMovies: [],
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

	handleViewDetailMovie = (item) => {
		this.props.history.push(`/detail-movie/${item.id}`);
		console.log("props slideMovie: ", this.props);
	};

	render() {
		let arrMovies = this.state.arrMovies;
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
										let imageBase64 = new Buffer(
											item.image,
											"base64"
										).toString("binary");

										let title = item.title;
										let genre = item.genre;
										let rating = item.rating;

										return (
											<div className="box-slide-customize">
												<div
													className="box-image-movie"
													onClick={() =>
														this.handleViewDetailMovie(item)
													}>
													<div
														className="bg-image"
														style={{
															backgroundImage: `url(${imageBase64})`,
														}}
													/>
												</div>
												<div className="box-movie-text">
													<div className="title-movie">
														{title.length < 25
															? title
															: `${title.slice(0, 23)}...`}
													</div>
													<div className="category">
														{genre.length < 25
															? genre
															: `${genre.slice(0, 28)}...`}
													</div>
												</div>
												<div className="rate">
													<i className="fas fa-star"></i> {rating}
												</div>
											</div>
										);
									})}
							</Slider>
						</div>
					</div>
				</div>
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
