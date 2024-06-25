import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./BannerReview.scss";

class BannerReview extends Component {
	render() {
		return (
			<div className="trailer-banner-container">
				<div className="pink"></div>
				<div className="home-banner-content">
					<div className="home-banner-booking">
						<div className="banner-content-title">
							Review phim chiếu rạp
						</div>
						<div className="review-banner-content">
							Nền tảng đánh giá, review phim chiếu rạp uy tín, chất lượng
							từ các nhà phê bình và hàng triệu người dùng
						</div>
					</div>
					<div className="home-header-banner"></div>
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
	connect(mapStateToProps, mapDispatchToProps)(BannerReview)
);
