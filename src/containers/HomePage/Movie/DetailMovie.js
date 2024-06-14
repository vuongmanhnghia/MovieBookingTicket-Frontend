import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailMovie.scss";
import { getDetailMovieService } from "../../../services/movieService";
class DetailMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailMovie: {},
		};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.props.match.params.id;
			let response = await getDetailMovieService(id);
			if (response && response.errCode === 0) {
				this.setState({
					detailMovie: response.data,
				});
			}
		}
	}

	render() {
		let title = this.state.detailMovie.title;
		let description = this.state.detailMovie.description;
		let rating = this.state.detailMovie.rating;
		let duration = this.state.detailMovie.duration;
		let releaseDate = this.state.detailMovie.releaseDate;
		let genre = this.state.detailMovie.genre;
		let director = this.state.detailMovie.director;
		let image = this.state.detailMovie.image;
		let date = new Date(releaseDate);
		let newDescription = String(description);
		return (
			<>
				<HomeNavigation />
				<div className="movie-detail-container">
					<div className="movie-detail-content">
						<div className="box-movie-detail">
							<div className="box-movie-detail-image">
								<div
									className="movie-detail-image"
									style={{
										backgroundImage: `url(${image})`,
									}}
								/>
							</div>
							<div className="box-movie-detail-content">
								<div className="movie-detail-title">{title}</div>
								<div className="box-releaseYear-duration">
									<div className="releaseYear">
										{date.getFullYear()}
									</div>{" "}
									&ndash;
									<div className="duration">{`${duration} phút`}</div>
								</div>
								<div className="movie-detail-rating">
									<i class="fas fa-star"></i>
									{rating}
								</div>
								<div className="movie-detail-director">{director}</div>
								<div className="description-title">Nội dung</div>
								<p className="movie-detail-description">
									{newDescription.length > 500
										? `${newDescription.substring(0, 500)}...`
										: newDescription}
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
										<div className="genre">{genre}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
