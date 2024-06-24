import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./AllMovies.scss";
import * as actions from "../../../store/actions";
import ReactPaginate from "react-paginate";

class AllMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listMovies: [],
			currentPage: 1,
			currentLimit: 10,
			totalPage: 0,
		};
	}

	async componentDidMount() {
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
		await this.setState({ currentPage: event.selected + 1 });
		this.fetchMovies();
	};

	render() {
		let { totalPage, listMovies } = this.state;
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
											<div
												className="box-movie-image-content"
												onClick={() =>
													this.props.history.push(
														`/detail-movie/${movie.id}`
													)
												}>
												<div
													className="box-movie-image"
													style={{
														background: `url(${movie.image})`,
													}}></div>
											</div>
											<div
												className="box-movie-content"
												onClick={() =>
													this.props.history.push(
														`/detail-movie/${movie.id}`
													)
												}>
												<div className="box-movie-title">
													{movie.title.length > 23
														? movie.title.slice(0, 20) + "..."
														: movie.title}
												</div>
												<div className="box-movie-genre">
													{movie.genre.length > 30
														? movie.genre.slice(0, 30) + "..."
														: movie.genre}
												</div>
											</div>
											<div className="box-movie-rating">
												<i
													class="fa fa-star"
													aria-hidden="true"></i>
												{movie.rating}
											</div>
										</div>
									);
								})}
						</div>
						{totalPage > 0 && (
							<div className="all-movies-footer">
								<ReactPaginate
									nextLabel={
										<i
											class="fa fa-angle-right"
											aria-hidden="true"></i>
									}
									onPageChange={this.handlePageClick}
									pageRangeDisplayed={3}
									marginPagesDisplayed={1}
									pageCount={totalPage}
									previousLabel={
										<i
											class="fa fa-angle-left"
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
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
		fetchMoviesPage: (page, limit) =>
			dispatch(actions.fetchMoviesPage(page, limit)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AllMovies)
);
