import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeNavigation.scss";

class HomeNavigation extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="home-nav-container">
					<div className="home-nav-content">
						<div className="nav-left-container">
							<a href="http://localhost:3000/home">
								<div className="camera-logo"></div>
							</a>
							<div className="account-content">
								<a href="#">Đăng nhập</a>
							</div>
							<div className="account-content">
								<a href="#">Đăng ký</a>
							</div>
						</div>
						<div className="nav-right-container">
							<div className="nav-right-content row">
								<div className="nav-text">
									<a href="#">Lịch chiếu</a>
								</div>
								<div className="nav-text">
									<a href="#">Rạp chiếu</a>
								</div>
								<div className="nav-text">
									<a href="#">Phim chiếu</a>
								</div>
								<div className="nav-text">
									<a href="#">Review phim</a>
								</div>
								<div className="nav-text">
									<a href="#">Top phim</a>
								</div>
								<div className="nav-text">
									<a href="#">Blog phim</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="home-header-banner-container">
					<div className="home-header-banner-content">
						<div className="home-header-banner-booking">
							<div className="banner-content-title">
								Đặt mua vé xem phim
							</div>
							<div className="banner-content-check">
								<ul className="list-booking-check">
									<li>
										<i className="fas fa-check-circle"></i>Mua vé
										online, trải nghiệm phim hay
									</li>
									<li>
										<i className="fas fa-check-circle"></i>Đặt vé an
										toàn
									</li>
									<li>
										<i className="fas fa-check-circle"></i>Tha hồ chọn
										chỗ ngồi, mua bắp nước tiện lợi
									</li>
									<li>
										<i className="fas fa-check-circle"></i>Lịch sử đặt
										vé được lưu lại ngay
									</li>
								</ul>
							</div>
							<div className="btn-booking-content">
								<div className="btn-booking">Đặt vé ngay</div>
							</div>
						</div>
						<div className="home-header-banner"></div>
					</div>
				</div>
			</React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavigation);
