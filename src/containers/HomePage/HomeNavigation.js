import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeNavigation.scss";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";

class HomeNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allTradeMarks: [],
		};
	}
	handleViewShowtime = () => {
		this.props.history.push(`/detail-showtime`);
	};
	async componentDidMount() {
		await this.props.fetchAllTradeMarks();
		let allTradeMarks = this.props.allTradeMarks.map((item) => {
			return item.tradeMark;
		});
		this.setState({
			allTradeMarks: allTradeMarks,
		});

		let activeNagigation = document.querySelectorAll(".nav-text-item");
		activeNagigation.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".nav-text-item")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});
	}

	handleViewHomePage = async () => {
		await this.props.history.push("/cinema");
		document
			.querySelectorAll(".nav-text-item")
			.forEach((item) => item.classList.remove("active"));
	};

	handleViewDeatilCinema = async (item) => {
		await this.props.history.push(`/detail-cinema/${item}`);
		let activeNagigation = document.querySelector(".dropdown-select");
		await document
			.querySelectorAll(".nav-text-item")
			.forEach((item) => item.classList.remove("active"));
		activeNagigation.classList.add("active");
	};

	render() {
		let { allTradeMarks } = this.state;
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
							onClick={() => this.handleViewHomePage()}>
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
								<div
									className="nav-text-item"
									onClick={() => this.handleViewShowtime()}>
									<span>Lịch chiếu</span>
								</div>
							</div>
							<div className="nav-text dropdown">
								<div
									className="dropdown-select nav-text-item"
									onClick={() =>
										this.props.history.push(`/all-cinemas`)
									}>
									<span className="dropdown-selected">Rạp chiếu</span>
									<i class="fa fa-chevron-down" aria-hidden="true"></i>
								</div>
								<ul className="dropdown_list">
									{allTradeMarks &&
										allTradeMarks.length > 0 &&
										allTradeMarks.map((item) => {
											return (
												<div
													className="dropdown_item"
													onClick={() =>
														this.handleViewDeatilCinema(item)
													}>
													<span>{item}</span>
												</div>
											);
										})}
								</ul>
							</div>
							<div className="nav-text">
								<div
									className="nav-text-item"
									onClick={() =>
										this.props.history.push(`/all-movies`)
									}>
									Phim chiếu
								</div>
							</div>
							<div className="nav-text">
								<div
									className="nav-text-item"
									onClick={() =>
										this.props.history.push(`/review-movie`)
									}>
									<span>Review phim</span>
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
		allTradeMarks: state.cinema.allTradeMarks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomeNavigation)
);
