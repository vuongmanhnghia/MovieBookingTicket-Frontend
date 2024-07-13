import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeBanner.scss";
import { withRouter } from "react-router-dom";

class HomeBanner extends Component {
	render() {
		return (
			<div className="home-banner-container">
				<div className="home-banner-content">
					<div className="home-banner-booking">
						<div className="banner-content-title">
							Đặt mua vé xem phim
						</div>
						<div className="banner-content-check">
							<ul className="list-booking-check">
								<li>
									<i className="fas fa-check-circle"></i>Mua vé online{" "}
									<b>trải nghiệm phim hay</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Đặt vé an toàn</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>Tha hồ{" "}
									<b>chọn chỗ ngồi, mua bắp nước</b> tiện lợi
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Lịch sử đặt vé</b> được lưu lại ngay
								</li>
							</ul>
						</div>
						<div
							className="btn-booking-content"
							onClick={() =>
								this.props.history.push(`/detail-showtime`)
							}>
							<div className="btn-booking">Đặt vé ngay</div>
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
	connect(mapStateToProps, mapDispatchToProps)(HomeBanner)
);
