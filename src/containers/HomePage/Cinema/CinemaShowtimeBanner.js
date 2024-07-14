import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CinemaShowtimeBanner.scss";

class CinemaShowtimeBanner extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	render() {
		let { background, image, name, location, rating } = this.props.tradeMark;
		return (
			<div className="cinema-showtime-banner-container">
				<div
					className="cinema-showtime-banner-content"
					style={{
						backgroundImage: `url(${background})`,
					}}>
					<div className="cinema-showtime-header">
						<div
							className="cinema-showtime-header-logo"
							style={{
								background: `url(${image})`,
							}}></div>
						<div className="cinema-showtime-header-content">
							<div className="cinema-showtime-header-title">{name}</div>

							<div className="cinema-showtime-header-location">
								<i className="fas fa-map-marker-alt"></i>
								{location}
							</div>
							<div className="cinema-showtime-header-rating">
								<i className="fas fa-star"></i>
								{rating}
							</div>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CinemaShowtimeBanner)
);
