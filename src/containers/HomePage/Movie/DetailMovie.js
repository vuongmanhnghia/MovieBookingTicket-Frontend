import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailMovie.scss";
import { getDetailMovieService } from "../../../services/movieService";
import ShowtimeData from "./ShowtimeData";
import Footer from "../Section/Footer";
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
			showtimeData: [],
			newDescription: "",
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
			this.setState({
				title: this.state.detailMovie.title,
				description: this.state.detailMovie.description,
				rating: this.state.detailMovie.rating,
				duration: this.state.detailMovie.duration,
				releaseDate: this.state.detailMovie.releaseDate,
				genre: this.state.detailMovie.genre,
				director: this.state.detailMovie.director,
				image: this.state.detailMovie.image,
				showtimeData: this.state.detailMovie.showtimeData,
				date: new Date(this.state.releaseDate),
				newDescription: String(this.state.detailMovie.description),
			});
		}
	}

	render() {
		let releaseDate = this.state.detailMovie.releaseDate;
		let date = new Date(releaseDate);
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
										backgroundImage: `url(${this.state.image})`,
									}}
								/>
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
				</div>
				<ShowtimeData showtimeData={this.state.showtimeData} />
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
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
