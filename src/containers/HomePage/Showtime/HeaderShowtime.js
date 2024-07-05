import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./HeaderShowtime.scss";
import LoadingSkeleton from "../LoadingSkeleton";

class HeaderShowtime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	componentDidMount() {
		this.closeLoading(1000);
	}

	closeLoading = (countdown) => {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, countdown);
	};

	render() {
		let { tradeMark } = this.props;
		let { loading } = this.state;
		return (
			<>
				{" "}
				<div className="header-showtime-container">
					<div className="header-showtime-content">
						{loading && (
							<LoadingSkeleton
								style={{
									width: "100%",
									height: "36px",
									marginBottom: "20px",
								}}
							/>
						)}
						{!loading && (
							<div className="header-showtime-title">
								Lịch chiếu phim tại {tradeMark}
							</div>
						)}
					</div>
				</div>
			</>
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
	connect(mapStateToProps, mapDispatchToProps)(HeaderShowtime)
);
