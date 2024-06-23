import React, { Component } from "react";
import { connect } from "react-redux";
import "./BannerMovie.scss";
import { withRouter } from "react-router-dom";

class BannerMovie extends Component {
	render() {
		return (
			<div className="home-banner-container">
				<div className="home-banner-content">
					<div className="home-banner-booking">
						<div className="banner-content-title">
							Phim chiếu rạp 2024
						</div>
						<div className="banner-content-check">
							<ul className="list-booking-check">
								<li>
									<i className="fas fa-check-circle"></i>Đa dạng{" "}
									<b>phim chiếu rạp 2024</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>Lịch chiếu
									phim <b>cập nhật đầy đủ nhất</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Đánh giá phim rạp</b> chi tiết chân thật
								</li>
								<li>
									<i className="fas fa-check-circle"></i>Đặt vé
									<b>xem phim Online</b> dễ dàng
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
	connect(mapStateToProps, mapDispatchToProps)(BannerMovie)
);
