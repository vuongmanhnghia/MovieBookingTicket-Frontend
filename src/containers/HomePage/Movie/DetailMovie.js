import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailMovie.scss";
import * as actions from "../../../store/actions";
class DetailMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrMovies: [],
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.match && this.props.match && this.props.match.params.id) {
			this.setState({
				arrMovies: this.props.topMovies,
			});
		}
	}

	render() {
		return (
			<>
				<HomeNavigation />
				<div className="movie-detail-container">
					<div className="movie-detail-content">
						<div className="box-movie-detail">
							<div className="box-movie-detail-image">
								<div className="movie-detail-image" />
							</div>
							<div className="box-movie-detail-content">
								<div className="movie-detail-title" />
								<ul className="releaseYear-duration">
									<li>Release Date: </li>
									<li>Duration: </li>
								</ul>
								<div className="movie-detail-rating" />
								<p className="movie-detail-description" />
								<ul className="releaseDate-genre">
									<li>Release Date: </li>
									<li>Genre: </li>
								</ul>
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
		topMovies: state.movie.topMovies,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadTopMovies: () => dispatch(actions.fetchTopMovies()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
