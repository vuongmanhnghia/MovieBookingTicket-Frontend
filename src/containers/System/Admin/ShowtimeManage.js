import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ShowtimeManage.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";

class MovieManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMovie: "",
			selectedCinema: "",
			selectedScreen: "",
			startDate: "",
			arrayTimes: [],
			listMovies: [],
			listCinemas: [],
			listScreens: [],
		};
	}

	async componentDidMount() {
		this.props.fetchAllMovies();
		this.props.fetchAllCinemas();
		this.props.fetchAllTimes();
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

	buildDataSelectScreen = (inputData) => {
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
		if (prevProps.allScreens !== this.props.allScreens) {
			let data = this.buildDataSelectScreen(this.props.allScreens);
			this.setState({
				listScreens: data,
			});
		}

		if (prevProps.allTimes !== this.props.allTimes) {
			let data = this.props.allTimes;
			if (data && data.length > 0) {
				data = data.map((item) => ({ ...item, isSelected: false }));
			}
			this.setState({
				arrayTimes: data,
			});
		}
	}

	handleSelectedMovie = (selectedMovie) => {
		this.setState({ selectedMovie });
	};

	handleSelectedCinema = (selectedCinema) => {
		this.setState({ selectedCinema });
		let cinemaId = selectedCinema.value;
		this.props.fetchAllScreens(cinemaId);
	};

	handleSelectedScreen = (selectedScreen) => {
		this.setState({ selectedScreen });
	};

	onChangeInputDate = (date) => {
		this.setState({
			startDate: date[0],
		});
	};

	// save showtime
	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = [
			"selectedMovie",
			"selectedCinema",
			"selectedScreen",
			"startDate",
		];
		for (let i = 0; i < arrCheck.length; i++) {
			if (this.state[arrCheck[i]] === "") {
				isValid = false;
				toast.error("Vui lòng nhập " + arrCheck[i] + " của bạn");
				break;
			}
		}

		return isValid;
	};
	handleSaveShowtime = async () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;
		let result = [];
		let {
			arrayTimes,
			selectedCinema,
			selectedMovie,
			selectedScreen,
			startDate,
		} = this.state;

		let formatDate = new Date(startDate).getTime();
		if (arrayTimes && arrayTimes.length > 0) {
			let selectedTime = arrayTimes.filter(
				(item) => item.isSelected === true
			);
			if (selectedTime && selectedTime.length > 0 && !isNaN(formatDate)) {
				selectedTime.map((item) => {
					let object = {};
					object.movieId = selectedMovie.label;
					object.cinemaId = selectedCinema.label;
					object.screenId = selectedScreen.label;
					object.startDate = formatDate;
					object.startTime = item.value;
					result.push(object);
				});
				await this.props.createNewShowtime({
					arrShowtimes: result,
				});
			} else {
				toast.error("Vui lòng chọn thời gian");
			}
		}
	};

	handleClickButtonTime = (time) => {
		let { arrayTimes } = this.state;
		if (arrayTimes && arrayTimes.length > 0) {
			arrayTimes = arrayTimes.map((item) => {
				if (item.id === time.id) item.isSelected = !item.isSelected;
				return item;
			});

			this.setState({
				arrayTimes: arrayTimes,
			});
		}
	};

	render() {
		console.log(this.state);
		let { arrayTimes } = this.state;
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
										options={this.state.listScreens}
									/>
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-showtime.start-date" />
									</label>
									<DatePicker
										className="form-control"
										onChange={this.onChangeInputDate}
										value={this.state.startDate}
									/>
								</div>
								<div className="col-12 title-pick-time">
									<FormattedMessage id="manage-showtime.start-time" />
								</div>
								<div className="col-12 pick-time-container">
									{arrayTimes &&
										arrayTimes.length > 0 &&
										arrayTimes.map((item, index) => {
											return (
												<button
													onClick={() => {
														this.handleClickButtonTime(item);
													}}
													className={
														item.isSelected === true
															? "btn btn-time active"
															: "btn btn-time"
													}
													key={index}>
													{item.value}
												</button>
											);
										})}
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
		allScreens: state.screen.allScreens,
		allTimes: state.admin.allTimes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllMovies: () => dispatch(actions.fetchAllMovies()),
		fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
		fetchAllScreens: (cinemaId) =>
			dispatch(actions.fetchAllScreens(cinemaId)),
		createNewShowtime: (data) => dispatch(actions.createNewShowtime(data)),
		fetchAllTimes: () => dispatch(actions.fetchAllTimes()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieManage);
