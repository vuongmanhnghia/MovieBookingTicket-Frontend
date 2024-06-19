import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ShowtimeManage.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";

class ScreenManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTradeMark: "",
			selectedCinema: "",
			nameScreen: "",
			totalSeats: "",
			listTradeMarks: [],
			listCinemas: [],
		};
	}

	async componentDidMount() {
		await this.props.fetchAllTradeMarks();
	}

	buildDataSelectTradeMark = async (inputData) => {
		let result = [];
		if (inputData && inputData.length > 0) {
			let newData = [...new Set(inputData.map((item) => item.tradeMark))];
			newData.map((item, index) => {
				let object = {};
				object.label = item;
				object.value = index + 1;
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

	async componentDidUpdate(prevProps) {
		if (prevProps.allTradeMarks !== this.props.allTradeMarks) {
			let data = await this.buildDataSelectTradeMark(
				this.props.allTradeMarks
			);
			this.setState({
				listTradeMarks: data,
			});
		}

		if (prevProps.allCinemas !== this.props.allCinemas) {
			let data = this.buildDataSelectCinema(this.props.allCinemas);
			this.setState({
				listCinemas: data,
			});
		}
	}

	handleSelectedTradeMark = (selectedTradeMark) => {
		this.setState({ selectedTradeMark });
		let tradeMarkId = selectedTradeMark.label;
		this.props.fetchAllCinemasByTradeMark(tradeMarkId);
	};

	handleSelectedCinema = (selectedCinema) => {
		this.setState({ selectedCinema });
	};

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState,
		});
	};
	// save screen
	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = [
			"selectedTradeMark",
			"selectedCinema",
			"nameScreen",
			"totalSeats",
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
		let { selectedTradeMark, selectedCinema, nameScreen, totalSeats } =
			this.state;
		await this.props.createNewScreen({
			tradeMarkId: selectedTradeMark.label,
			cinemaId: selectedCinema.label,
			name: nameScreen,
			totalSeats: totalSeats,
		});
	};

	render() {
		return (
			<div className="showtime-manage-container">
				<div className="showtime-manage-content">
					<div className="title">screen - manage</div>
					<div className="showtime-manage-body">
						<div className="container">
							<div className="row">
								<div className="col-12"></div>
								<div className="add-user col-12 my-3 ">
									<FormattedMessage id="manage-screen.add" />
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-screen.select-tradeMark" />
									</label>
									<Select
										value={this.state.selectTradeMark}
										onChange={this.handleSelectedTradeMark}
										options={this.state.listTradeMarks}
									/>
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-screen.select-cinema" />
									</label>
									<Select
										value={this.state.selectedCinema}
										onChange={this.handleSelectedCinema}
										options={this.state.listCinemas}
									/>
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-screen.name-screen" />
									</label>
									<input
										value={this.state.nameScreen}
										type="text"
										className="form-control"
										onChange={(event) =>
											this.handleOnChangeInput(event, "nameScreen")
										}
									/>
								</div>
								<div className="form-group col-6">
									<label>
										<FormattedMessage id="manage-screen.total-seats" />
									</label>
									<input
										type="number"
										value={this.state.totalSeats}
										className="form-control"
										onChange={(event) =>
											this.handleOnChangeInput(event, "totalSeats")
										}></input>
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
										<FormattedMessage id="manage-screen.save" />
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
		allTradeMarks: state.cinema.allTradeMarks,
		allCinemas: state.cinema.allCinemasByTradeMark,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllTradeMarks: () => dispatch(actions.fetchAllTradeMarks()),
		createNewScreen: (data) => dispatch(actions.createNewScreen(data)),
		fetchAllCinemasByTradeMark: (data) =>
			dispatch(actions.fetchAllCinemasByTradeMark(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenManage);
