import React, { Component } from "react";
import { connect } from "react-redux";
import "./BannerShowtime.scss";
import { withRouter } from "react-router-dom";

class BannerShowtime extends Component {
	render() {
		return (
			<div className="home-banner-container">
				<div className="home-banner-content">
					<div className="home-banner-booking">
						<div className="banner-content-title">Lịch chiếu phim</div>
						<div className="banner-content-check">
							<ul className="list-booking-check">
								<li>
									<i className="fas fa-check-circle"></i>Lịch chiếu
									luôn <b>cập nhật sớm nhất</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Suất chiếu đầy đủ</b> các rạp
								</li>
								<li>
									<i className="fas fa-check-circle"></i>Đặt lịch chiếu{" "}
									<b>mua vé siêu nhanh</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Đặt vé lịch chiếu phim</b> yêu thích mọi nơi
								</li>
							</ul>
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
	connect(mapStateToProps, mapDispatchToProps)(BannerShowtime)
);
