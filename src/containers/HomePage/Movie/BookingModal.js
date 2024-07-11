import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../store/actions";
import moment from "moment";
import { toast } from "react-toastify";
import InfoBookingModal from "./InfoBookingModal";

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
			numberSeatsSelected: [],
			arrBookingSeats: [],

			isOpenInfoModal: false,
			dataBooking: {},
		};
	}

	async componentDidUpdate(prevProps, prevState) {
		if (prevProps.dataScreen !== this.props.dataScreen) {
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
		if (prevProps.createBookingStatus !== this.props.createBookingStatus) {
			if (this.props.createBookingStatus === 0) {
				await this.props.createNewBookingSeat(this.state.arrBookingSeats);
				this.props.resetBooking();
			}
		}
	}

	handleOnChangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
	};

	sortSeats = (a, b) => a - b;

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

	closeModal = () => {
		this.setState({
			seatsSelected: [],
			totalPrice: 0,
		});
		this.props.closeBookingModal();
	};

	handleSelectSeat = (seat, numberSeat) => {
		if (this.state.seatsSelected.includes(seat)) {
			let index = this.state.seatsSelected.indexOf(seat);
			let indexNumber = this.state.numberSeatsSelected.indexOf(numberSeat);
			this.state.seatsSelected.splice(index, 1);
			this.state.numberSeatsSelected.splice(indexNumber, 1);
		} else {
			this.state.seatsSelected.push(seat);
			this.state.numberSeatsSelected.push(numberSeat);
		}
		this.setState({
			totalPrice:
				this.state.seatsSelected.length * this.props.dataScreen.priceSeats,
		});
	};

	handleOnClickBooking = async () => {
		if (this.state.seatsSelected.length === 0) {
			toast.error("Vui lòng chọn ghế ngồi");
		} else {
			// set data booking
			let { dataShowtime } = this.props;
			let seatsSelected = this.state.seatsSelected.sort();
			let numberSeatsSelected = this.state.numberSeatsSelected.sort(
				this.sortSeats
			);
			await this.setState({
				dataBooking: {
					// fullName: this.state.fullName,
					// email: this.state.email,
					// phoneNumber: this.state.phoneNumber,
					totalTickets: this.state.seatsSelected.length,
					totalPrice: ("" + this.state.totalPrice).slice(0, -3) + ".000",
					movieId: dataShowtime.movieId,
					cinemaId: dataShowtime.cinemaId,
					screenId: this.props.dataScreen.name,
					time: dataShowtime.startTime,
					date: dataShowtime.startDate,
					bookingDate: moment().format("DD/MM/YYYY"),
					seatsSelected: seatsSelected,
				},
			});

			// set data booking seat
			let dataBookingSeat = await seatsSelected.map((item, index) => {
				let object = {};
				object.seat = item;
				object.numberSeat = numberSeatsSelected[index];
				object.cinema = dataShowtime.cinemaId;
				object.screen = dataShowtime.screenId;
				object.time = dataShowtime.startTime;
				object.date = dataShowtime.startDate;
				object.bookingDate = moment().format("DD/MM/YYYY");
				return object;
			});
			await this.setState({
				arrBookingSeats: dataBookingSeat,
			});

			// open info modal
			this.setState({
				isOpenInfoModal: true,
			});
		}
	};

	Booking = async () => {
		await this.props.createNewBooking(this.state.dataBooking);
		this.props.closeBookingModal();
		this.setState({
			fullName: "",
			email: "",
			phoneNumber: "",
			totalTickets: 0,
			totalPrice: 0,
			seatsSelected: [],
			dataBooking: {},
		});
	};

	handleBooking = async () => {
		this.setState({
			isOpenInfoModal: false,
		});
		await this.setState({
			dataBooking: {
				...this.state.dataBooking,
				fullName: this.state.fullName,
				email: this.state.email,
				phoneNumber: this.state.phoneNumber,
			},
		});
		await this.Booking();
	};

	closeInfoModal = () => {
		this.setState({
			isOpenInfoModal: false,
		});
	};

	render() {
		let { isOpenModal, dataShowtime, dataScreen, bookingSeats } = this.props;
		let totalPrice = "" + this.state.totalPrice;
		let { isOpenInfoModal, dataBooking, fullName, email, phoneNumber } =
			this.state;
		return (
			<Modal
				isOpen={isOpenModal}
				className="booking-modal-container"
				size="lg"
				centered>
				{dataShowtime && dataScreen && bookingSeats && (
					<div className="booking-modal-content">
						<div className="booking-modal-header">
							<i
								class="fas fa-chevron-left"
								onClick={() => this.closeModal()}></i>
							<div className="booking-modal-title">Mua vé xem phim</div>
						</div>
						<div className="booking-modal-body">
							<div className="booking-seats">
								<div className="screen"></div>
								<div className="name-screen">MÀN HÌNH</div>
								<div className="all-seats">
									{new Array(dataScreen.totalSeats)
										.fill(0)
										.map((item, index) => {
											if (bookingSeats.numberSeat.includes(index)) {
												return (
													<div
														className="seat-box-bookinged"
														key={index + 1}>
														{
															bookingSeats.seat[
																bookingSeats.numberSeat.indexOf(
																	index
																)
															]
														}
													</div>
												);
											} else {
												if (index >= 30 && index < 80) {
													// Kiểm tra index có thuộc booking seat không

													if (index < 40) {
														return (
															<div
																onClick={() =>
																	this.handleSelectSeat(
																		"D" + ((index + 1) % 30),
																		index
																	)
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
																	this.handleSelectSeat(
																		"E" + ((index + 1) % 40),
																		index
																	)
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
																	this.handleSelectSeat(
																		"F" + ((index + 1) % 50),
																		index
																	)
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
																	this.handleSelectSeat(
																		"G" + ((index + 1) % 60),
																		index
																	)
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
																	this.handleSelectSeat(
																		"H" + ((index + 1) % 70),
																		index
																	)
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
																	this.handleSelectSeat(
																		"A" + (index + 1),
																		index
																	)
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
																	this.handleSelectSeat(
																		"B" + ((index + 1) % 10),
																		index
																	)
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
																	this.handleSelectSeat(
																		"C" + ((index + 1) % 20),
																		index
																	)
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
																	this.handleSelectSeat(
																		"I" + ((index + 1) % 80),
																		index
																	)
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
																	this.handleSelectSeat(
																		"J" + ((index + 1) % 90),
																		index
																	)
																}
																className="seat-box nomal"
																key={index + 1}>
																J{(index + 1) % 90}
															</div>
														);
													}
												}
											}
										})}
								</div>
								<div className="seat-note">
									<div className="seat-note-item">
										<div className="seat-note-logo bookinged"></div>
										<div className="seat-note-text">Ghế đã đặt</div>
									</div>
									<div className="seat-note-item">
										<div className="seat-note-logo selected"></div>
										<div className="seat-note-text">Ghế bạn chọn</div>
									</div>
									<div className="seat-note-item">
										<div className="seat-note-logo vip"></div>
										<div className="seat-note-text">Ghế VIP</div>
									</div>
									<div className="seat-note-item">
										<div className="seat-note-logo normal"></div>
										<div className="seat-note-text">Ghế thường</div>
									</div>
								</div>
							</div>
							<div className="modal-body-container">
								<div className="modal-body-content">
									<div className="modal-body-header">
										{dataShowtime && dataShowtime.movieId}
									</div>
									<div className="modal-body-info">
										{` ${
											dataShowtime && dataShowtime.startTime
										} - ${new Date(
											dataShowtime.startDate
										).getDate()}/${new Date(
											dataShowtime.startDate
										).getMonth()} - Phòng chiếu ${dataScreen.name}, ${
											dataShowtime && dataShowtime.tradeMarkId
										} - ${dataShowtime && dataShowtime.cinemaId}`}
									</div>
									<div className="modal-body-showtime"></div>
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
								onClick={() => this.handleOnClickBooking()}>
								Đặt vé
							</button>
						</div>
					</div>
				)}
				<InfoBookingModal
					handleOnChangeInput={this.handleOnChangeInput}
					fullName={fullName}
					email={email}
					phoneNumber={phoneNumber}
					dataBooking={dataBooking}
					getInfoBooking={this.getInfoBooking}
					isOpenInfoModal={isOpenInfoModal}
					handleBooking={this.handleBooking}
					closeInfoModal={this.closeInfoModal}
				/>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		totalBooking: state.booking.totalBooking,
		createBookingStatus: state.booking.createBookingStatus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewBooking: (data) => {
			dispatch(actions.createNewBooking(data));
		},
		createNewBookingSeat: (data) => {
			dispatch(actions.createNewBookingSeat(data));
		},
		resetBooking: () => {
			dispatch(actions.resetBooking());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
