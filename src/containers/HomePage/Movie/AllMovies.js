import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AllMovies.scss";
import * as actions from "../../../store/actions";
import ReactPaginate from "react-paginate";
import TrailerMovie from "./TrailerMovie";
import LoadingSkeleton from "../LoadingSkeleton";

class AllMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listMovies: [],
			currentPage: 1,
			currentLimit: 10,
			totalPage: 0,

			isOpenModal: false,
			dataMovie: {},

			loading: true,
		};
	}

	async componentDidMount() {
		this.closeLoading(700);

		await this.fetchMovies();
	}

	fetchMovies = async () => {
		await this.props.fetchMoviesPage(
			this.state.currentPage,
			this.state.currentLimit
		);
		await this.setState({
			totalPage: this.props.moviesPage.totalPage,
			listMovies: this.props.moviesPage.movies,
		});
	};

	handlePageClick = async (event) => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false });
		}, 500);
		await this.setState({ currentPage: event.selected + 1 });
		this.fetchMovies();
	};

	closeTrailerModal = () => {
		this.setState({
			isOpenModal: false,
		});
	};

	handleViewTraileMovie = async (item) => {
		this.setState({
			isOpenModal: true,
			dataMovie: item,
		});
	};

	closeLoading = (countdown) => {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, countdown);
	};

	render() {
		let { totalPage, listMovies, isOpenModal, dataMovie, loading } =
			this.state;
		return (
			<>
				<div className="all-movies-container">
					<div className="all-movies-content">
						<div className="all-movies-title">Danh sách phim</div>
						<div className="list-movies">
							{listMovies &&
								listMovies.map((movie, index) => {
									return (
										<div className="box-movie" key={index}>
											<div className="box-movie-image-content">
												{loading && (
													<LoadingSkeleton
														style={{
															width: "100%",
															height: "100%",
														}}
													/>
												)}
												{!loading && (
													<>
														<div
															className="box-movie-image"
															style={{
																background: `url(${movie.image})`,
															}}
															onClick={() =>
																this.props.history.push(
																	`/detail-movie/${movie.title}`
																)
															}></div>
														<i
															className="far fa-play-circle"
															onClick={() =>
																this.handleViewTraileMovie(
																	movie
																)
															}></i>
													</>
												)}
											</div>
											<div
												className="box-movie-content"
												onClick={() =>
													this.props.history.push(
														`/detail-movie/${movie.id}`
													)
												}>
												{loading && (
													<LoadingSkeleton
														style={{
															width: "100%",
															height: "18.75px",
															marginBottom: "5px",
														}}
													/>
												)}
												{!loading && (
													<div className="box-movie-title">
														{movie.title.length > 23
															? movie.title.slice(0, 20) + "..."
															: movie.title}
													</div>
												)}

												{loading && (
													<LoadingSkeleton
														style={{
															width: "100%",
															height: "18px",
															marginBottom: "5px",
														}}
													/>
												)}
												{!loading && (
													<div className="box-movie-genre">
														{movie.genre.length > 30
															? movie.genre.slice(0, 30) + "..."
															: movie.genre}
													</div>
												)}
											</div>

											{loading && (
												<LoadingSkeleton
													style={{
														width: "100%",
														height: "18px",
													}}
												/>
											)}
											{!loading && (
												<div className="box-movie-rating">
													<i
														className="fa fa-star"
														aria-hidden="true"></i>
													{movie.rating}
												</div>
											)}
										</div>
									);
								})}
						</div>
						{totalPage > 0 && (
							<div className="all-movies-footer">
								<ReactPaginate
									nextLabel={
										<i
											className="fa fa-angle-right"
											aria-hidden="true"></i>
									}
									onPageChange={this.handlePageClick}
									pageRangeDisplayed={3}
									marginPagesDisplayed={1}
									pageCount={totalPage}
									previousLabel={
										<i
											className="fa fa-angle-left"
											aria-hidden="true"></i>
									}
									pageClassName="page-item"
									pageLinkClassName="page-link"
									previousClassName="page-item"
									previousLinkClassName="page-link"
									nextClassName="page-item"
									nextLinkClassName="page-link"
									breakLabel="..."
									breakClassName="page-item"
									breakLinkClassName="page-link"
									containerClassName="pagination"
									activeClassName="active"
									renderOnZeroPageCount={null}
								/>
							</div>
						)}
						<TrailerMovie
							isOpenModal={isOpenModal}
							closeBookingModal={this.closeTrailerModal}
							dataMovie={dataMovie}
						/>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		moviesPage: state.movie.moviesPage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchMoviesPage: (page, limit) =>
			dispatch(actions.fetchMoviesPage(page, limit)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllMovies)
);
