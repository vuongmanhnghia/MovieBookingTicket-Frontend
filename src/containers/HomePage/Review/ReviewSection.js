import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import "./ReviewSection.scss";
import ReactPaginate from "react-paginate";
import TrailerMovie from "../Movie/TrailerMovie";
import LoadingSkeleton from "../LoadingSkeleton";

class ReviewSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listMovies: [],
			currentPage: 1,
			currentLimit: 6,
			totalPage: 0,

			isOpenModal: false,
			loading: true,
		};
	}

	async componentDidMount() {
		await this.fetchMovies();
	}

	fetchMovies = async () => {
		await this.props.fetchReviewMoviesPage(
			this.state.currentPage,
			this.state.currentLimit
		);
		this.setState({
			totalPage: this.props.reviewMoviesPage.totalPage,
			listMovies: this.props.reviewMoviesPage.movies,
		});
	};

	handlePageClick = async (event) => {
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
			<div className="review-section-container">
				<div className="review-section-content">
					<div className="review-section-list">
						{this.closeLoading(1000)}
						{listMovies &&
							listMovies.map((movie, index) => {
								return (
									<div className="box-review-movie">
										{loading && (
											<LoadingSkeleton
												width="100%"
												height="100%"
												borderRadius="12px"
											/>
										)}
										{!loading && (
											<>
												<div
													className="box-review-movie-background"
													style={{
														background: `url(${movie.background})`,
													}}></div>
												<div className="box-review-movie-title">
													{movie.title}
												</div>
												<i
													class="far fa-play-circle"
													onClick={() =>
														this.handleViewTraileMovie(movie)
													}></i>
											</>
										)}
									</div>
								);
							})}
					</div>
					{totalPage > 0 && (
						<div className="review-movies-footer">
							<ReactPaginate
								nextLabel={
									<i class="fa fa-angle-right" aria-hidden="true"></i>
								}
								onPageChange={this.handlePageClick}
								pageRangeDisplayed={3}
								marginPagesDisplayed={1}
								pageCount={totalPage}
								previousLabel={
									<i class="fa fa-angle-left" aria-hidden="true"></i>
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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		reviewMoviesPage: state.movie.reviewMoviesPage,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchReviewMoviesPage: (page, limit) =>
			dispatch(actions.fetchReviewMoviesPage(page, limit)),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ReviewSection)
);
