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
						<div className="text-content-1">Lịch chiếu phim</div>
						<div className="text-content-1">Rạp chiếu phim</div>
						<div className="text-content-1">Phim chiếu rạp</div>
					</div>
					<div className="col">
						<div className="title-footer">DỊCH VỤ NỔI BẬT</div>
						<div className="text-content-2"></div>
						<div className="text-content-2"></div>
						<div className="text-content-2"></div>
						<div className="text-content-2"></div>
						<div className="text-content-2"></div>
					</div>
					<div className="col">
						<div className="title-footer">CHĂM SÓC KHÁCH HÀNG</div>
						<div className="text-content-3"></div>
						<div className="text-content-3"></div>
						<div className="text-content-3"></div>
						<div className="text-content-3"></div>
					</div>
					<div className="col">
						<div className="title-footer">KẾT NỐI VỚI CHÚNG TÔI</div>
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
