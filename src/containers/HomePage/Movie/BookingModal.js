import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import * as actions from "../../../store/actions";
class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fullName: "",
			email: "",
			phoneNumber: "",
			totalTickets: 0,
			totalPrice: 0,
		};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

	handleOnChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;

		this.setState({
			...copyState,
		});
	};

	handleSaveBooking = () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;

		this.props.createNewBooking({
			fullName: this.state.fullName,
			email: this.state.email,
			phoneNumber: this.state.phoneNumber,
			totalTickets: this.state.totalTickets,
			totalPrice: this.state.totalPrice,
			movieId: this.props.dataShowtime.movieId,
			cinemaId: this.props.dataShowtime.cinemaId,
			screenId: this.props.dataScreen.id,
			showtimeId: this.props.dataShowtime.startTime,
			bookingDate: new Date(),
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
	render() {
		let { isOpenModal, closeBookingModal, dataShowtime, dataScreen, image } =
			this.props;
		return (
			<Modal
				isOpen={isOpenModal}
				className={"booking-modal-container"}
				size="lg"
				centered>
				<div className="booking-modal-content">
					<div className="booking-modal-header">
						<i
							class="fas fa-chevron-left"
							onClick={closeBookingModal}></i>
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

								<div className="modal-body-seat row">
									<div className="total-seats col-6 ">
										<span className="text">Tổng số chỗ ngồi:</span>{" "}
										<span className="sum">
											{dataScreen.totalSeats}
										</span>
									</div>
									<div className="remaining-seats col-6">
										<span className="text">Số chỗ ngồi còn lại:</span>{" "}
										<span className="sum">
											{dataScreen.totalSeats}
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
							<span className="sum">{`${
								dataScreen.priceSeats * this.state.totalTickets
							}đ`}</span>
						</div>
						<button
							className="btn btn-secondary"
							onClick={() => this.handleSaveBooking()}>
							Đặt vé
						</button>
					</div>
				</div>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
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
