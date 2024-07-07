import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import "./SelectCinema.scss";
import LoadingSkeleton from "../LoadingSkeleton";
import { set } from "lodash";

class SelectCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allTradeMarks: [],
			selectTradeMark: "",
			loading: true,
		};
	}

	async componentDidMount() {
		this.closeLoading(500);
		await this.props.fetchAllTradeMarks();
		if (this.props.allTradeMarks && this.props.allTradeMarks.length > 0) {
			this.setState({
				allTradeMarks: this.props.allTradeMarks,
				selectTradeMark: this.props.allTradeMarks[0].tradeMark,
			});
		}
		this.getSelectedCinema();

		setTimeout(() => {
			let activeCinema = document.querySelectorAll("div.select-cinema-item");
			let activeLogo = document.querySelectorAll(
				"div.select-cinema-item-logo"
			);
			let activeTradeMark = document.querySelectorAll(
				"div.select-cinema-item-name"
			);
			activeCinema.forEach((item, index) => {
				item.addEventListener("click", () => {
					document
						.querySelectorAll("div.select-cinema-item-logo")
						.forEach((item) => item.classList.remove("active"));
					document
						.querySelectorAll("div.select-cinema-item-name")
						.forEach((item) => item.classList.remove("active-tradeMark"));
					activeLogo[index].classList.add("active");
					activeTradeMark[index].classList.add("active-tradeMark");
				});
			});
		}, 2000);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	getSelectedCinema = (item) => {
		if (item) {
			this.props.handleShowSelectCinema(item.tradeMark);
		} else {
			this.props.handleShowSelectCinema(this.state.selectTradeMark);
		}
	};

	closeLoading = (countdown) => {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, countdown);
	};

	render() {
		let { allTradeMarks, loading } = this.state;
		return (
			<>
				<div className="select-cinema-container">
					<div className="select-cinema-content">
						{loading && (
							<LoadingSkeleton
								style={{
									width: "100%",
									height: "71px",
									"border-radius": "12px",
								}}
							/>
						)}
						{!loading && (
							<>
								{allTradeMarks &&
									allTradeMarks.length > 0 &&
									allTradeMarks.map((item, index) => {
										if (index === 0) {
											return (
												<div
													className="select-cinema-item"
													onClick={() =>
														this.getSelectedCinema(item)
													}>
													<div
														className="select-cinema-item-logo active"
														style={{
															background: `url(${item.image})`,
														}}></div>
													<div className="select-cinema-item-name active-tradeMark">
														{item.tradeMark.length > 7
															? `${item.tradeMark.slice(
																	0,
																	7
															  )}...`
															: item.tradeMark}
													</div>
												</div>
											);
										} else {
											return (
												<div
													className="select-cinema-item"
													onClick={() =>
														this.getSelectedCinema(item)
													}>
													<div
														className="select-cinema-item-logo"
														style={{
															background: `url(${item.image})`,
														}}></div>
													<div className="select-cinema-item-name">
														{item.tradeMark.length > 7
															? `${item.tradeMark.slice(
																	0,
																	7
															  )}...`
															: item.tradeMark}
													</div>
												</div>
											);
										}
									})}
							</>
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
		allTradeMarks: state.cinema.allTradeMarks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SelectCinema)
);
