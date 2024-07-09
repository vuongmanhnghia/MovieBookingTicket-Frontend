import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeNavigation.scss";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions";
import { set } from "lodash";
import { handleViewDetailMovie } from "../../containers/HomePage/Movie/ShowtimeData";

class HomeNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allTradeMarks: [],
			modalSearch: false,

			inputSearch: "",
		};
	}
	handleViewShowtime = () => {
		this.props.history.push(`/detail-showtime`);
	};
	async componentDidMount() {
		await this.props.fetchAllTradeMarks();
		this.props.fetchAllMoviesSearch(this.state.inputSearch);
		let allTradeMarks = this.props.allTradeMarks.map((item) => {
			return item.tradeMark;
		});
		this.setState({
			allTradeMarks: allTradeMarks,
		});

		document.querySelector(".dropdown-icon").addEventListener("click", () => {
			document.querySelector(".search-input").focus();
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

	handleOpenSearch = async () => {
		await this.setState({
			modalSearch: !this.state.modalSearch,
		});
		let searchInput = document.querySelector(".dropdown-box");
		let modalSearchInput = document.querySelector(".modal-search");
		if (this.state.modalSearch) {
			searchInput.style.opacity = "1";
			searchInput.style.visibility = "visible";
			modalSearchInput.style.display = "block";
			modalSearchInput.style.opacity = "1";
			modalSearchInput.style.visibility = "visible";
			modalSearchInput.style.zIndex = "30";
		} else {
			this.props.fetchAllMoviesSearch("");
			searchInput.style.opacity = "0";
			searchInput.style.visibility = "hiddien";
			modalSearchInput.style.opacity = "0";
			modalSearchInput.style.visibility = "hiddien";
			setTimeout(() => {
				modalSearchInput.style.display = "none";
				this.setState({
					inputSearch: "",
				});
			}, 300);
		}
	};

	handleCloseSearch = async () => {
		await this.setState({
			modalSearch: false,
		});
		let searchInput = document.querySelector(".dropdown-box");
		let modalSearchInput = document.querySelector(".modal-search");
		searchInput.style.opacity = "0";
		searchInput.style.visibility = "hiddien";

		modalSearchInput.style.opacity = "0";
		modalSearchInput.style.visibility = "hiddien";

		setTimeout(() => {
			modalSearchInput.style.display = "none";
			this.setState({
				inputSearch: "",
			});
		}, 300);
	};

	handleOnChangeInputSearch = async (e) => {
		await this.setState({
			inputSearch: e.target.value,
		});
		await this.props.fetchAllMoviesSearch(this.state.inputSearch);
	};

	showDetailMovie = async (item) => {
		this.props.history.push(`/detail-movie/${item.title}`);
		await this.setState({
			modalSearch: false,
		});
		let searchInput = document.querySelector(".dropdown-box");
		let modalSearchInput = document.querySelector(".modal-search");
		searchInput.style.opacity = "0";
		searchInput.style.visibility = "hiddien";

		modalSearchInput.style.opacity = "0";
		modalSearchInput.style.visibility = "hiddien";

		setTimeout(() => {
			modalSearchInput.style.display = "none";
			this.setState({
				inputSearch: "",
			});
		}, 300);
	};

	render() {
		let { allTradeMarks } = this.state;
		let { allMoviesSearch } = this.props;
		return (
			<div className="home-nav-container">
				<div
					className="modal-search"
					onClick={() => this.handleCloseSearch()}></div>
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
							<div className="nav-text dropdown-search-content">
								<div
									className="dropdown-icon nav-text-item"
									onClick={() => this.handleOpenSearch()}>
									<i className="fa fa-search" aria-hidden="true"></i>
								</div>
								<div className="dropdown-box active-dropdown-box">
									<div className="dropdown-search">
										<i
											className="fa fa-search"
											aria-hidden="true"></i>
										<input
											value={this.state.inputSearch}
											onChange={(e) =>
												this.setState(() =>
													this.handleOnChangeInputSearch(e)
												)
											}
											className="search-input"
											type="text"
											placeholder="Tìm kiếm phim..."></input>
									</div>
									<ul className="dropdown_list">
										{allMoviesSearch &&
											allMoviesSearch.length > 0 &&
											allMoviesSearch.map((item) => {
												return (
													<div
														className="dropdown_item"
														onClick={() =>
															this.showDetailMovie(item)
														}>
														<div
															className="dropdown-item-image"
															style={{
																background: `url(${item.image})`,
															}}></div>
														<div className="dropdown-item-content">
															<span className="dropdown-item-title">
																{item.title}
															</span>
															<span className="dropdown-item-genre">
																{item.genre.length > 25
																	? `${item.genre.slice(
																			0,
																			23
																	  )}...`
																	: item.genre}
															</span>
															<span className="dropdown-item-rating">
																<i
																	class="fa fa-star"
																	aria-hidden="true"></i>
																{item.rating}
															</span>
														</div>
													</div>
												);
											})}
									</ul>
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
		allMoviesSearch: state.movie.allMoviesSearch,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
		fetchAllMoviesSearch: (keyword) =>
			dispatch(actions.fetchAllMoviesSearch(keyword)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(HomeNavigation)
);
