import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";
import { withRouter } from "react-router-dom";

class Footer extends Component {
	render() {
		return (
			<div className="section-footer-container">
				<div className="footer-container-content">
					<div className="footer-content">
						<div
							className="footer-title"
							onClick={() => this.props.history.push("/cinema")}>
							MUA VÉ XEM PHIM
						</div>
						<div
							className="footer-title"
							onClick={() =>
								this.props.history.push("/detail-showtime")
							}>
							LỊCH CHIẾU PHIM
						</div>
						<div
							className="footer-title"
							onClick={() =>
								this.props.history.push("/detail-showtime")
							}>
							RẠP CHIẾU PHIM
						</div>
						<div
							className="footer-title"
							onClick={() => this.props.history.push("/all-movies")}>
							PHIM CHIẾU RẠP
						</div>
					</div>
					<div className="call-me">
						<div className="call-me-text">KẾT NỐI VỚI TÔI</div>
						<a
							href="https://www.facebook.com/vuongmanhnghia365/"
							target="blank">
							<i class="fab fa-facebook"></i>
						</a>
						<a href="https://github.com/vuongmanhnghia" target="blank">
							<i class="fab fa-github-square"></i>
						</a>
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
						<p>&copy; Vuong Manh Nghia 2024. All rights reserved.</p>
					</div>
				</div>
				<div className="null-navigation"></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
