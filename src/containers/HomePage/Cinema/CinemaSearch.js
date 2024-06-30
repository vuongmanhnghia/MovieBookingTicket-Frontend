import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CinemaSearch.scss";
import * as actions from "../../../store/actions";

class CinemaSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showtimeData: [],
			imageTradeMark: "",
			allTradeMarks: [],
			allCinemasByTradeMark: [],
		};
	}

	async componentDidMount() {
		await this.props.fetchAllTradeMarks();
		this.setState({
			allTradeMarks: this.props.allTradeMarks,
		});

		let activeCinema = document.querySelectorAll("div.box-cinema");
		let activeLogo = document.querySelectorAll("div.logo-cinema");
		let activeTradeMark = document.querySelectorAll("div.tradeMark-cinema");
		activeCinema.forEach((item, index) => {
			item.addEventListener("click", () => {
				document
					.querySelectorAll("div.logo-cinema")
					.forEach((item) => item.classList.remove("active"));
				document
					.querySelectorAll("div.tradeMark-cinema")
					.forEach((item) => item.classList.remove("active-tradeMark"));
				activeLogo[index].classList.add("active");
				activeTradeMark[index].classList.add("active-tradeMark");
			});
		});

		this.handleChangeCinema(this.state.allTradeMarks[0]);
	}

	handleChangeCinema = async (item) => {
		this.setState({
			imageTradeMark: item.image,
		});

		await this.props.fetchAllCinemasByTradeMark(item.tradeMark);
		this.setState({
			allCinemasByTradeMark: this.props.allCinemasByTradeMark,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	handleChaneBoxCinema = (item) => {
		console.log(item);
	};

	render() {
		let { allTradeMarks, allCinemasByTradeMark, imageTradeMark } = this.state;

		return (
			<div className="cinema-search-container">
				<div className="cinema-search-content">
					<div className="cinema-search-select-content">
						{allTradeMarks &&
							allTradeMarks.length > 0 &&
							allTradeMarks.map((item, index) => {
								if (index === 0) {
									return (
										<div
											className="box-cinema"
											onClick={() => this.handleChangeCinema(item)}>
											<div
												className="logo-cinema active"
												style={{
													background: `url(${item.image})`,
												}}></div>
											<div className="tradeMark-cinema active-tradeMark">
												{item.tradeMark < 7
													? item.tradeMark
													: `${item.tradeMark.slice(0, 7)}...`}
											</div>
										</div>
									);
								}
								return (
									<div
										className="box-cinema"
										onClick={() => this.handleChangeCinema(item)}>
										<div
											className="logo-cinema"
											style={{
												background: `url(${item.image})`,
											}}></div>
										<div className="tradeMark-cinema">
											{item.tradeMark < 7
												? item.tradeMark
												: `${item.tradeMark.slice(0, 7)}...`}
										</div>
									</div>
								);
							})}
					</div>
					<div className="cinema-search-all-cinemas">
						{allCinemasByTradeMark &&
							allCinemasByTradeMark.length > 0 &&
							allCinemasByTradeMark.map((item, index) => {
								return (
									<div
										className="list-cinema-box"
										onClick={() => this.handleChaneBoxCinema(item)}>
										<div
											className="list-cinema-box-logo"
											style={{
												background: `url(${imageTradeMark})`,
											}}></div>
										<div className="name-address">
											<div className="list-cinema-box-name">
												{item.name}
											</div>
											<div className="list-cinema-box-address">
												{item.location.length < 120
													? item.location
													: `${item.location.slice(0, 120)}...`}
											</div>
										</div>
										<i class="fas fa-chevron-right"></i>
									</div>
								);
							})}
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
		allCinemasByTradeMark: state.cinema.allCinemasByTradeMark,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
		fetchAllCinemasByTradeMark: (tradeMark) =>
			dispatch(actions.fetchAllCinemasByTradeMark(tradeMark)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CinemaSearch)
);
