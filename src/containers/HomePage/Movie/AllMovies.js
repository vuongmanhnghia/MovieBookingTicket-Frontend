import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AllMovies.scss";
import * as actions from "../../../store/actions";

class AllMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		await this.props.fetchAllMovies();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	render() {
		let { allMovies } = this.props;
		return (
			<>
				<div className="all-movies-container">
					<div className="all-movies-content">
						<div className="list-movies">
							{allMovies.map((movie, index) => {
								let imageBase64 = new Buffer(
									movie.image,
									"base64"
								).toString("binary");
								return (
									<div className="box-movie" key={index}>
										<div className="box-movie-image-content">
											<div
												className="box-movie-image"
												style={{
													background: `url(${imageBase64})`,
												}}></div>
										</div>
										<div className="box-movie-content">
											<div className="box-movie-title">
												{movie.title.length > 23
													? movie.title.slice(0, 20) + "..."
													: movie.title}
											</div>
											<div className="box-movie-genre">
												{movie.genre.length > 30
													? movie.genre.slice(0, 30) + "..."
													: movie.genre}
											</div>
											<div className="box-movie-rating">
												<i
													class="fa fa-star"
													aria-hidden="true"></i>
												{movie.rating}
											</div>
										</div>
									</div>
								);
							})}
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
		allMovies: state.movie.allMovies,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllMovies)
);
