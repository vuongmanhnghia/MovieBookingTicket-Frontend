import React, { Component } from "react";
import { connect } from "react-redux";
import "./ShowtimeData.scss";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

// Import css files

class ShowtimeData extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	componentDidUpdate(prevProps) {}

	handleChange = () => {
		let active = document.querySelectorAll(".box-date");
		active.forEach((item) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll(".box-date")
					.forEach((item) => item.classList.remove("active"));
				item.classList.add("active");
			});
		});
	};

	render() {
		let showtimeData = this.props.showtimeData;
		// let releaseTime = this.props.showtimeData.;
		console.log(showtimeData);
		return (
			<div className="movie-detail-showtimeData-container row">
				<div className="movie-detail-showtimeData-content col-8">
					<div className="showtimeData-content-title">
						Lịch chiếu{" "}
						{showtimeData && showtimeData.length > 0
							? showtimeData[0].movieId
							: " phim không tồn tại"}{" "}
						suất
					</div>
					<div className="showtimeData-container">
						<div className="showtimeData-date">
							{showtimeData &&
								showtimeData.length > 0 &&
								showtimeData.map((item, index) => {
									let date = new Date();
									return (
										<div
											className="box-date"
											onClick={() => this.handleChange()}>
											{date.getDate() + index}
										</div>
									);
								})}
						</div>
						<div className="showtime_Data-cinema">
							{showtimeData &&
								showtimeData.length > 0 &&
								showtimeData.map((item, index) => {
									let title = item.cinemaId.split(" ")[0];
									return (
										<div className="box-cinema">
											<div className="box-cinema-title">{title}</div>
											<div className="box-cinema-time">
												{item.time}
											</div>
										</div>
									);
								})}
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
	connect(mapStateToProps, mapDispatchToProps)(ShowtimeData)
);
