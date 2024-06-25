import React, { Component } from "react";
import { connect } from "react-redux";
import "./TrailerMovie.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

class TrailerMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	handleViewDetailMovie = async (id) => {
		await this.props.history.push(`/detail-movie/${id}`);
	};

	render() {
		let { isOpenModal, closeBookingModal, dataMovie } = this.props;
		return (
			<Modal
				isOpen={isOpenModal}
				className="trailer-movie-container"
				size="lg"
				centered>
				{dataMovie && dataMovie.description && (
					<div className="trailer-movie-content">
						<div className="trailer-movie-video">
							{ReactHtmlParser(dataMovie.trailer)}
						</div>
						<div className="movie-info">
							<div
								className="movie-image"
								style={{ background: `url(${dataMovie.image})` }}></div>
							<div className="movie-content">
								<div className="trailer-movie-title-genre">
									<div className="trailer-movie-title">
										{dataMovie.title}
									</div>
									<span className="line-mid"> - </span>
									<div className="trailer-movie-genre">
										{dataMovie.genre}
									</div>
								</div>
								<div className="trailer-movie-description">
									{dataMovie.description.length > 500
										? dataMovie.description.slice(0, 500) + "..."
										: dataMovie.description}
								</div>
								<div className="movie-actions">
									<div
										className="trailer-movie-booking btn"
										onClick={() =>
											this.handleViewDetailMovie(dataMovie.id)
										}>
										Đặt vé
									</div>
									<div
										className="movie-close btn"
										onClick={closeBookingModal}>
										Đóng
									</div>
								</div>
							</div>
						</div>
						<div className="close-trailer">
							<i
								class="fa fa-times-circle"
								aria-hidden="true"
								onClick={closeBookingModal}></i>
						</div>
					</div>
				)}
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewBooking: (data) => {
			dispatch(actions.createNewBooking(data));
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TrailerMovie)
);
