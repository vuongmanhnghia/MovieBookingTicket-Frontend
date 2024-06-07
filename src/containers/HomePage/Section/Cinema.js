import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cinema.scss";

class Cinema extends Component {
	render() {
		return (
			<div className="section-cinema">
				<div className="cinema-container">
					<div className="mb-5 text-center md:mb-8">
						<div className="cinema-title">Hệ thống rạp chiếu phim</div>
						<div className="cinema-description">
							Danh sách hệ thống chiếu rạp phim lớn có mặt khắp cả nước
						</div>
					</div>
					<div className="cinema-content">
						<div className="box-cinema">
							<div className="logo-cinema"></div>
							<div className="box-cinema-content">
								<div className="box-cinema-content-title">CGV</div>
								<div className="box-cinema-content-description">
									Hệ thống rạp chiếu phim lớn nhất Việt Nam
								</div>
								<div className="box-cinema-content-rate">
									<i className="fas fa-star"></i>
								</div>
								<div className="box-cinema-content-quantity">
									<i className="fas fa-map-marker-alt"></i>
								</div>
							</div>
						</div>
						<div className="box-cinema">
							<div className="logo-cinema"></div>
							<div className="box-cinema-content">
								<div className="box-cinema-content-title">CGV</div>
								<div className="box-cinema-content-description">
									Hệ thống rạp chiếu phim lớn nhất Việt Nam
								</div>
								<div className="box-cinema-content-rate">
									<i className="fas fa-star"></i>
								</div>
								<div className="box-cinema-content-quantity">
									<i className="fas fa-map-marker-alt"></i>
								</div>
							</div>
						</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
