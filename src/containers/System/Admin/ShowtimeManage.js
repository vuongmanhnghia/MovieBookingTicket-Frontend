import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ShowtimeManage.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";

class MovieManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMovie: "",
			selectedCinema: "",
			selectedScreen: "",
			startTime: "",
			listMovies: [],
			listCinemas: [],
		};
	}

	async componentDidMount() {
		this.props.fetchAllMovies();
		this.props.fetchAllCinemas();
	}

	buildDataSelectMovie = (inputData) => {
		let result = [];
		if (inputData && inputData.length > 0) {
			inputData.map((item, index) => {
				let object = {};
				object.label = item.title;
				object.value = item.id;
				result.push(object);
				return result;
			});
		}
		return result;
	};

	buildDataSelectCinema = (inputData) => {
		let result = [];
		if (inputData && inputData.length > 0) {
			inputData.map((item, index) => {
				let object = {};
				object.label = item.name;
				object.value = item.id;
				result.push(object);
				return result;
			});
		}
		return result;
	};

	componentDidUpdate(prevProps) {
		if (prevProps.allMovies !== this.props.allMovies) {
			let data = this.buildDataSelectMovie(this.props.allMovies);
			this.setState({
				listMovies: data,
			});
		}
		if (prevProps.allCinemas !== this.props.allCinemas) {
			let data = this.buildDataSelectCinema(this.props.allCinemas);
			this.setState({
				listCinemas: data,
			});
		}
	}

	handleSelectedMovie = (selectedMovie) => {
		this.setState({ selectedMovie });
	};

	handleSelectedCinema = (selectedCinema) => {
		this.setState({ selectedCinema });
	};

	handleSelectedScreen = (selectedScreen) => {
		this.setState({ selectedScreen });
	};

	onChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleSaveShowtime = () => {
		console.log(this.state);
	};
	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = [
			"selectedMovie",
			"selectedCinema",
			"selectedScreen",
			"startTime",
		];
		for (let i = 0; i < arrCheck.length; i++) {
			if (this.state[arrCheck[i]] === "") {
				isValid = false;
				alert("Vui lòng nhập " + arrCheck[i] + " của bạn");
				break;
			}
		}

		return isValid;
	};

	render() {
		console.log(this.state);
		let { startTime } = this.state;
		return (
			<div className="showtime-manage-container">
				<div className="showtime-manage-content">
					<div className="title">Showtime - manage</div>
					<div className="showtime-manage-body">
						<div className="container">
							<div className="row">
								<div className="col-12"></div>
								<div className="add-user col-12 my-3 ">
									<FormattedMessage id="manage-showtime.add" />
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-showtime.select-movie" />
									</label>
									<Select
										value={this.state.selectedMovie}
										onChange={this.handleSelectedMovie}
										options={this.state.listMovies}
									/>
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-showtime.select-cinema" />
									</label>
									<Select
										value={this.state.selectedCinema}
										onChange={this.handleSelectedCinema}
										options={this.state.listCinemas}
									/>
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-showtime.select-screen" />
									</label>
									<Select
										value={this.state.selectedScreen}
										onChange={this.handleSelectedScreen}
										options={this.state.listCinemas}
									/>
								</div>

								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-showtime.select-start-time" />
									</label>
									<input
										type="datetime-local"
										className="form-control"
										value={startTime}
										onChange={(event) => {
											this.onChangeInput(event, "startTime");
										}}
									/>
								</div>
								<div className="form-group col-12">
									<button
										onClick={() => {
											this.handleSaveShowtime();
										}}
										className={
											"form-control btn btn-primary mt-3 col-12"
										}
										type="submit">
										<FormattedMessage id="manage-showtime.save" />
									</button>
								</div>
								<div className="col-12 mb-5"></div>
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
		allMovies: state.movie.allMovies,
		allCinemas: state.cinema.allCinemas,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
		fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieManage);