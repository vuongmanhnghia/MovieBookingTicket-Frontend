import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../store/actions";
import moment from "moment";
import { set } from "lodash";

class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: "",
			email: "",
			phoneNumber: "",
			totalTickets: 0,
			totalPrice: 0,

			seatsSelected: [],
		};
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.dataScreen !== this.props.dataScreen) {
			console.log("dataScreen", this.props.dataScreen);
			setTimeout(() => {
				document.querySelectorAll(".seat-box").forEach((item) => {
					item.addEventListener("click", (e) => {
						if (e.target.classList.contains("selected")) {
							e.target.classList.remove("selected");
						} else {
							e.target.classList.add("selected");
						}
					});
				});
			}, 300);
		}
	}

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState,
		});
	};

	handleSaveBooking = async () => {
		await this.props.createNewBooking({
			fullName: this.state.fullName,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			totalTickets: this.state.totalTickets,
			totalPrice: this.state.totalPrice,
			movieId: this.props.dataShowtime.movieId,
			cinemaId: this.props.dataShowtime.cinemaId,
			screenId: this.props.dataScreen.name,
			time: this.props.dataShowtime.startTime,
			date: this.props.dataShowtime.startDate,
			bookingDate: moment().format("DD/MM/YYYY"),
		});
		this.setState({
			fullName: "",
			email: "",
			phoneNumber: "",
			totalTickets: 0,
			totalPrice: 0,
			seatsSelected: [],
		});
		this.props.closeBookingModal();
	};
	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = ["fullName", "email", "phoneNumber", "totalTickets"];
		for (let i = 0; i < arrCheck.length; i++) {
			if (this.state[arrCheck[i]] === "") {
				isValid = false;
				alert("Vui lòng nhập " + arrCheck[i] + " của bạn");
				break;
			}
		}
		return isValid;
	};

	handleOnChangeInputTicket = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
		this.setState({
			totalPrice: this.state.totalTickets * this.props.dataScreen.priceSeats,
		});
	};

	closeModal = () => {
		this.setState({
			seatsSelected: [],
			totalPrice: 0,
		});
		this.props.closeBookingModal();
	};

	handleSelectSeat = (seat) => {
		if (this.state.seatsSelected.includes(seat)) {
			let index = this.state.seatsSelected.indexOf(seat);
			this.state.seatsSelected.splice(index, 1);
		} else {
			this.state.seatsSelected.push(seat);
		}
		console.log(this.props.dataScreen.priceSeats);
		this.setState({
			totalPrice:
				this.state.seatsSelected.length * this.props.dataScreen.priceSeats,
		});
	};

	render() {
		let { isOpenModal, dataShowtime, dataScreen, image, totalBooking } =
			this.props;
		let totalPrice = "" + this.state.totalPrice;
		return (
			<Modal
				isOpen={isOpenModal}
				className={"booking-modal-container"}
				size="lg"
				centered>
				{dataShowtime && dataScreen && (
					<div className="booking-modal-content">
						<div className="booking-modal-header">
							<i
								class="fas fa-chevron-left"
								onClick={() => this.closeModal()}></i>
							<div className="booking-modal-title">Mua vé xem phim</div>
						</div>
						<div className="booking-modal-body">
							<div className="information row">
								<div className="col-4 form-group">
									<label>Họ tên</label>
									<input
										className="form-control"
										type="text"
										value={this.state.fullName}
										onChange={(event) => {
											this.handleOnChangeInput(event, "fullName");
										}}></input>
								</div>
								<div className="col-5 form-group">
									<label>Email</label>
									<input
										className="form-control"
										type="email"
										value={this.state.email}
										onChange={(event) => {
											this.handleOnChangeInput(event, "email");
										}}></input>
								</div>
								<div className="col-3 form-group">
									<label>Số điện thoại</label>
									<input
										className="form-control no-spinner"
										type="number"
										value={this.state.phoneNumber}
										onChange={(event) => {
											this.handleOnChangeInput(event, "phoneNumber");
										}}></input>
								</div>
							</div>
							<div className="booking-seats">
								<div className="screen"></div>
								<div className="name-screen">MÀN HÌNH</div>
								<div className="all-seats">
									{new Array(dataScreen.totalSeats)
										.fill(0)
										.map((item, index) => {
											if (index >= 30 && index < 80) {
												if (index < 40) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box vip"
															key={index + 1}>
															D{(index + 1) % 30}
														</div>
													);
												} else if (index < 50) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box vip"
															key={index + 1}>
															E{(index + 1) % 40}
														</div>
													);
												} else if (index < 60) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box vip"
															key={index + 1}>
															F{(index + 1) % 50}
														</div>
													);
												} else if (index < 70) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box vip"
															key={index + 1}>
															G{(index + 1) % 60}
														</div>
													);
												} else if (index < 80) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box vip"
															key={index + 1}>
															H{(index + 1) % 70}
														</div>
													);
												}
											} else {
												if (index < 10) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box nomal"
															key={index + 1}>
															A{index + 1}
														</div>
													);
												} else if (index < 20) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box nomal"
															key={index + 1}>
															B{(index + 1) % 10}
														</div>
													);
												} else if (index < 30) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box nomal"
															key={index + 1}>
															C{(index + 1) % 20}
														</div>
													);
												} else if (index < 90) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box nomal"
															key={index + 1}>
															I{(index + 1) % 80}
														</div>
													);
												} else if (index < 100) {
													return (
														<div
															onClick={() =>
																this.handleSelectSeat(index)
															}
															className="seat-box nomal"
															key={index + 1}>
															J{(index + 1) % 90}
														</div>
													);
												}
											}
										})}
								</div>
							</div>
							<div className="modal-body-container">
								<div
									className="modal-body-image"
									style={{ background: `url(${image})` }}></div>
								<div className="modal-body-content">
									<div className="modal-body-header">
										{dataShowtime && dataShowtime.movieId}
									</div>
									<div className="modal-body-cinema">
										{`${dataShowtime && dataShowtime.tradeMarkId} - ${
											dataShowtime && dataShowtime.cinemaId
										}`}
									</div>
									<div className="modal-body-showtime">
										{`${
											dataShowtime && dataShowtime.startTime
										} - ${new Date(
											dataShowtime.startDate
										).getDate()}/${new Date(
											dataShowtime.startDate
										).getMonth()} - Phòng chiếu ${dataScreen.name}`}
									</div>
									<div className="modal-body-seat ">
										<div className="total-seats  ">
											<span className="text">Tổng số chỗ ngồi:</span>{" "}
											<span className="sum">
												{dataScreen.totalSeats}
											</span>
										</div>
										<div className="remaining-seats">
											<span className="text">
												Số chỗ ngồi còn lại:
											</span>{" "}
											<span className="sum">
												{dataScreen.totalSeats - totalBooking}
											</span>
										</div>
									</div>
									<div className="booking row">
										<div className="price-seats col-6">
											<span className="text">Giá vé: </span>{" "}
											<span className="sum">
												{`${dataScreen.priceSeats} VNĐ`}
											</span>
										</div>
										<div className="total-tickets col-6">
											<span className="text">Số vé:</span>{" "}
											<input
												className="form-control"
												type="number"
												max={10}
												value={this.state.totalTickets}
												onChange={(event) => {
													this.handleOnChangeInputTicket(
														event,
														"totalTickets"
													);
												}}></input>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="booking-modal-footer">
							<div className="total">
								<span className="text">Tổng thanh toán</span>
								<span className="sum">
									{totalPrice.length > 3
										? `${totalPrice.slice(0, -3)}.000`
										: `${totalPrice.slice(-3, totalPrice.length)}`}
									đ
								</span>
							</div>
							<button
								className="btn btn-secondary"
								onClick={() => this.handleSaveBooking()}>
								Đặt vé
							</button>
						</div>
					</div>
				)}
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		totalBooking: state.booking.totalBooking,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewBooking: (data) => {
			dispatch(actions.createNewBooking(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
