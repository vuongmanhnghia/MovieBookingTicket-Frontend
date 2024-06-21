import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeNavigation.scss";

class HomeNavigation extends Component {
	render() {
		return (
			<div className="home-nav-container">
				<div className="home-nav-content">
					<div className="nav-left-container">
						<a href="https://github.com/vuongmanhnghia">
							<div className="avatar"></div>
						</a>
						<div className="line-mid"></div>
						<a href="http://localhost:3000/cinema">
							<div className="camera-logo"></div>
						</a>
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
