import React, { Component } from "react";
import { connect } from "react-redux";
import "./InfoBookingModal.scss";
import { Modal } from "reactstrap";

class InfoBookingModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	async componentDidMount() {}

	handleChange = async (event, id) => {
		await this.props.handleOnChangeInput(event, id);
	};

	handleBooking = async () => {
		this.props.handleBooking();
	};
	closeInfoModal = () => {
		this.props.closeInfoModal();
	};

	render() {
		let { isOpenInfoModal, dataBooking, fullName, email, phoneNumber } =
			this.props;
		return (
			<Modal
				isOpen={isOpenInfoModal}
				className="info-modal-container"
				size="lg"
				centered>
				<div className="info-modal-content row">
					<i
						class="fa fa-times"
						aria-hidden="true"
						onClick={() => this.closeInfoModal()}></i>
					<div className="info-modal-booking col-7">
						{dataBooking && dataBooking.seatsSelected && (
							<>
								<div className="info-modal-name-movie">
									{dataBooking.movieId}
								</div>
								<div className="info-modal-info-showtime row">
									<div className="info-modal-item col-6">
										<span className="text">THỜI GIAN</span>
										<span className="info">{dataBooking.time}</span>
									</div>
									<div className="info-modal-item col-6">
										<span className="text">NGÀY CHIẾU</span>
										<span className="info">
											{dataBooking.bookingDate}
										</span>
									</div>
									<div className="info-modal-item col-6">
										<span className="text">RẠP</span>
										<span className="info">
											{dataBooking.cinemaId}
										</span>
									</div>
									<div className="info-modal-item col-6">
										<span className="text">PHÒNG CHIẾU</span>
										<span className="info">
											{dataBooking.screenId}
										</span>
									</div>
									<div className="info-modal-item col-6">
										<span className="text">GHẾ</span>
										<span className="info">
											{dataBooking.seatsSelected.join(", ")}
										</span>
									</div>
									<div className="info-modal-item col-6">
										<span className="text">THÀNH TIỀN</span>
										<span className="info">
											{dataBooking.totalPrice}đ
										</span>
									</div>
								</div>
							</>
						)}
					</div>
					<div className="info-modal-info col-5">
						<div className="info-title">THÔNG TIN CỦA BẠN</div>
						<div className="info-content row">
							<div className="info-item form-group col-12">
								<label className="text">Họ và tên</label>
								<input
									value={fullName}
									onChange={(event) => {
										this.handleChange(event, "fullName");
									}}
									type="text"
									className="form-control"
									placeholder="Nhập họ và tên"
								/>
							</div>
							<div className="info-item form-group col-12">
								<label className="text">Email</label>
								<input
									value={email}
									onChange={(event) => {
										this.handleChange(event, "email");
									}}
									type="email"
									className="form-control"
									placeholder="Nhập email"
								/>
							</div>
							<div className="info-item form-group col-12">
								<label className="text">Số điện thoại</label>
								<input
									value={phoneNumber}
									onChange={(event) => {
										this.handleChange(event, "phoneNumber");
									}}
									type="text"
									className="form-control"
									placeholder="Nhập số điện thoại"
								/>
							</div>
							<div
								className="btn-booking"
								onClick={() => this.handleBooking()}>
								Đặt mua
							</div>
						</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoBookingModal);
