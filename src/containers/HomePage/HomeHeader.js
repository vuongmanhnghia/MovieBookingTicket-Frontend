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
							<div className="nav-text">Block phim</div>
							<div className="nav-text">
								<i class="fas fa-search"></i>
							</div>
						</div>
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
