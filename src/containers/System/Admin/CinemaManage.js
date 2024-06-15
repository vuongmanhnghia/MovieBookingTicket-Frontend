import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";

class CinemaManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tradeMark: "",
			name: "",
			location: "",
			rating: "",
			image: "",

			previewImgUrl: "",
		};
	}

	async componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.users !== this.props.users) {
			this.setState({
				tradeMark: "",
				name: "",
				location: "",
				rating: "",
				image: "",
				previewImgUrl: "",
			});
		}
	}

	onChangeInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	handleOnChangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			let objectUrl = URL.createObjectURL(file);
			this.setState({
				previewImgUrl: objectUrl,
				image: base64,
			});
		}
	};

	handleSaveMovie = () => {
		let isValid = this.checkValidateInput();
		if (isValid === false) return;

		this.props.createNewCinema({
			tradeMark: this.state.tradeMark,
			name: this.state.name,
			location: this.state.location,
			rating: this.state.rating,
			image: this.state.image,
		});
	};
	checkValidateInput = () => {
		let isValid = true;
		let arrCheck = ["tradeMark", "name", "location", "rating", "image"];
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
		let { tradeMark, name, location, rating } = this.state;
		return (
			<div className="user-redux-container">
				<div className="title">Cinema - Manage</div>
				<div className="user-redux-body">
					<div className="container">
						<div className="row">
							<div className="col-12"></div>
							<div className="add-user col-12 my-3 ">
								<FormattedMessage id="manage-cinema.add" />
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-cinema.tradeMark" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Trade Mark"
									value={tradeMark}
									onChange={(event) => {
										this.onChangeInput(event, "tradeMark");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-cinema.name" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Name"
									value={name}
									onChange={(event) => {
										this.onChangeInput(event, "name");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-cinema.rating" />
								</label>
								<input
									type="number"
									className="form-control"
									placeholder="Rating"
									value={rating}
									onChange={(event) => {
										this.onChangeInput(event, "rating");
									}}
								/>
							</div>
							<div className="form-group col-6">
								<label>
									<FormattedMessage id="manage-cinema.location" />
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Location"
									value={location}
									onChange={(event) => {
										this.onChangeInput(event, "location");
									}}
								/>
							</div>
							<div className="form-group col-12 form-preview-img">
								<label>
									<FormattedMessage id="manage-cinema.image" />
								</label>
								<div className="preview-image-container">
									<input
										hidden
										id="previewImg"
										type="file"
										onChange={(event) => {
											this.handleOnChangeImage(event);
										}}
									/>
									<label className="label-upload" htmlFor="previewImg">
										Tải ảnh <i className="fas fa-upload"></i>
									</label>
									<div
										className="preview-image"
										style={{
											backgroundImage: `url(${this.state.previewImgUrl})`,
										}}></div>
								</div>
							</div>

							<div className="form-group col-12"></div>
							<div className="form-group col-12">
								<button
									onClick={() => {
										this.handleSaveMovie();
									}}
									className={
										"form-control btn btn-primary mt-3 col-12"
									}
									type="submit">
									<FormattedMessage id="manage-cinema.save" />
								</button>
							</div>
							<div className="col-12 mb-5"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewCinema: (data) => dispatch(actions.createNewCinema(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CinemaManage);
