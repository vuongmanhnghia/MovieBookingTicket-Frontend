import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";

class BookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
		}
	}

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
								<input className="form-control" type="text"></input>
							</div>
							<div className="col-5 form-group">
								<label>Email</label>
								<input className="form-control" type="text"></input>
							</div>
							<div className="col-3 form-group">
								<label>Số điện thoại</label>
								<input className="form-control" type="number"></input>
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

								<div className="modal-body-seat">
									<div className="total-seats">
										<span className="text">Tổng số chỗ ngồi:</span>{" "}
										<span className="sum">
											{dataScreen.totalSeats}
										</span>
									</div>
									<div className="remaining-seats">
										<span className="text">Số chỗ ngồi còn lại:</span>{" "}
										<span className="sum">
											{dataScreen.totalSeats}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="booking-modal-footer">
						<div className="total">
							<span className="text">Tổng thanh toán</span>
							<span className="sum">0đ</span>
						</div>
						<button className="btn btn-secondary">Đặt vé</button>
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
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
