import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeNavigation.scss";
import { withRouter } from "react-router-dom";

class HomeNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleViewShowtime = () => {
		this.props.history.push(`/detail-showtime`);
	};

	render() {
		return (
			<div className="home-nav-container">
				<div className="home-nav-content">
					<div className="nav-left-container">
						<a href="https://github.com/vuongmanhnghia" target="blank">
							<div className="avatar"></div>
						</a>
						<div className="line-mid"></div>
						<div
							className="home-backroll"
							onClick={() => this.props.history.push("/cinema")}>
							<div className="camera-logo"></div>
							<div className="text-home-rollback">
								<span>
									Đặt vé <br></br> xem phim
								</span>
							</div>
						</div>
					</div>
					<div className="nav-right-container">
						<div className="nav-right-content row">
							<div className="nav-text">
								<div onClick={() => this.handleViewShowtime()}>
									Lịch chiếu
								</div>
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

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomeNavigation)
);
