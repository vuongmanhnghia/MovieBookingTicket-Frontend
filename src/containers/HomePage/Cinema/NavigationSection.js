import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailCinema.scss";
class DetailCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let {
			detailCinema,
			tradeMark,
			rating,
			image,
			background,
			slogan,
			location,
		} = this.props;
		return (
			<>
				<div className="cinema-detail-container">
					<div
						className="cinema-detail-content"
						style={{
							backgroundImage: `url(${background})`,
						}}>
						<div className="cinema-detail-header">
							<div
								className="cinema-detail-header-logo"
								style={{
									background: `url(${image})`,
								}}></div>
							<div className="cinema-detail-header-content">
								<div className="cinema-detail-header-title">
									{tradeMark}
								</div>
								<div className="cinema-detail-header-slogan">
									{slogan}
								</div>
								<div className="cinema-detail-header-rating">
									<i class="fas fa-star"></i>
									{rating} / 5
								</div>
								<div className="cinema-detail-header-location">
									<i class="fas fa-map-marker-alt"></i>
									{detailCinema.length} cửa hàng trong hệ thống
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
	return {
		// fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
