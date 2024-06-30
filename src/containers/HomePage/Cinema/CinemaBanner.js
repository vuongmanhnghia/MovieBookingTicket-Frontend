import React, { Component } from "react";
import { connect } from "react-redux";
// import "./CinemaBanner.scss";
import { withRouter } from "react-router-dom";

class CinemaBanner extends Component {
	render() {
		return (
			<div className="home-banner-container">
				<div className="home-banner-content">
					<div className="home-banner-booking">
						<div className="banner-content-title">Rạp chiếu phim</div>
						<div className="banner-content-check">
							<ul className="list-booking-check">
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Rạp chiếu phim đầy đủ</b> từ bắc tới nam
								</li>
								<li>
									<i className="fas fa-check-circle"></i>Suất chiếu{" "}
									<b>cập nhật liên tục</b>
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Ưu đãi đặc biệt</b> từng cụm rạp chiếu
								</li>
								<li>
									<i className="fas fa-check-circle"></i>
									<b>Chỉ cần một chạm</b> là có vé xem phim
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
	connect(mapStateToProps, mapDispatchToProps)(CinemaBanner)
);
