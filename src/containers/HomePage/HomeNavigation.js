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
		let allTradeMarks = this.filterTradeMarks(this.props.allTradeMarks).map(
			(item) => {
				return item.tradeMark;
			}
		);
		this.setState({
			allTradeMarks: allTradeMarks,
		});
	}

	filterTradeMarks(items) {
		const seenNames = new Set();
		return items.filter((item) => {
			if (seenNames.has(item.tradeMark)) {
				return false; // Bỏ qua các đối tượng có tên trùng
			} else {
				seenNames.add(item.tradeMark); // Lưu lại tên đã gặp
				return true; // Giữ lại đối tượng đầu tiên có tên này
			}
		});
	}

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
									<span>Lịch chiếu</span>
								</div>
							</div>
							<div className="nav-text dropdown">
								<div className="dropdown-select">
									<span className="dropdown-selected">Rạp chiếu</span>
									<i
										class="fa fa-chevron-right"
										aria-hidden="true"></i>
								</div>
								<ul className="dropdown_list">
									{allTradeMarks &&
										allTradeMarks.length > 0 &&
										allTradeMarks.map((item) => {
											return (
												<div
													className="dropdown_item"
													onClick={() =>
														this.props.history.push(
															`/detail-cinema/${item}`
														)
													}>
													<span>{item}</span>
												</div>
											);
										})}
								</ul>
							</div>

							<div className="nav-text">
								<div
									onClick={() =>
										this.props.history.push(`/all-movies`)
									}>
									Phim chiếu
								</div>
							</div>
							{/* <div className="nav-text">
								<div>Review phim</div>
							</div>
							<div className="nav-text">
								<div>Top phim</div>
							</div>
							<div className="nav-text">
								<div>Blog phim</div>
							</div> */}
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
