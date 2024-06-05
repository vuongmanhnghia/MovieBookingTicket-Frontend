import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="home-header-container">
					<div className="home-header-content">
						<div className="left-content">
							<div className="camera-logo"></div>
							<div className="account-content">Login</div>
							<div className="account-content">Signin</div>
						</div>
						<div className="right-content">
							<div className="nav-text">Lịch chiếu</div>
							<div className="nav-text">Rạp chiếu</div>
							<div className="nav-text">Phim chiếu</div>
							<div className="nav-text">Review phim</div>
							<div className="nav-text">Top phim</div>
							<div className="nav-text">Blog phim</div>
							<div className="input-search">
								<input type="text" placeholder="Nhập tên phim" />
								<i class="fas fa-search"></i>
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
										<i class="fas fa-check-circle"></i>Mua vé online,
										trải nghiệm phim hay
									</li>
									<li>
										<i class="fas fa-check-circle"></i>Đặt vé an toàn
									</li>
									<li>
										<i class="fas fa-check-circle"></i>Tha hồ chọn chỗ
										ngồi, mua bắp nước tiện lợi
									</li>
									<li>
										<i class="fas fa-check-circle"></i>Lịch sử đặt vé
										được lưu lại ngay
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
