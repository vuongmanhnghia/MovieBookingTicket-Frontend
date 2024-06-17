import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";

class Footer extends Component {
	render() {
		return (
			<div className="section-footer-container">
				<div className="row footer-container-content">
					<div className="col footer-content">
						<div className="title-footer">MUA VÉ XEM PHIM</div>
						<div className="text-content">Lịch chiếu phim</div>
						<div className="text-content">Rạp chiếu phim</div>
						<div className="text-content">Phim chiếu rạp</div>
					</div>
					<div className="col footer-content">
						<div className="title-footer">DỊCH VỤ NỔI BẬT</div>
						<div className="text-content"></div>
						<div className="text-content"></div>
						<div className="text-content"></div>
						<div className="text-content"></div>
						<div className="text-content"></div>
					</div>
					<div className="col footer-content">
						<div className="title-footer">CHĂM SÓC KHÁCH HÀNG</div>
						<div className="text-content"></div>
						<div className="text-content"></div>
						<div className="text-content"></div>
						<div className="text-content"></div>
					</div>
					<div className="col footer-content">
						<div className="title-footer">KẾT NỐI VỚI TÔI</div>
					</div>
				</div>
				<div className="more-info-container">
					<div className="more-info-content">
						<div className="logo"></div>
						<div className="info">
							<div className="myName">Vuong Manh Nghia</div>
							<div className="school">
								Học viện Công nghệ Bưu chính Viễn thông
							</div>
						</div>
					</div>
					<div className="copyright">
						<p>&copy; 2024 Vuong Manh Nghia 2024. All rights reserved.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
