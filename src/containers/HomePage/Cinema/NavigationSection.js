import React, { Component } from "react";
import { connect } from "react-redux";
import "./NavigationSection.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";

class NavigationSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailCinema: [],
			tradeMark: "",
			name: "",
			rating: "",
			image: "",
			background: "",
			slogan: "",
			location: "",

			id: "",
		};
	}

	async componentDidMount() {
		if (this.props.id) {
			let id = this.props.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				this.setState({
					detailCinema: response.data,
				});
			}
			this.setState({
				id: this.props.id,
				tradeMark: this.state.detailCinema[0].tradeMark,
				rating: this.state.detailCinema[0].rating,
				image: this.state.detailCinema[0].image,
				background: this.state.detailCinema[0].background,
			});
			if (this.state.tradeMark === "Lotte Cinema") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim từ Hàn Quốc",
				});
			} else if (this.state.tradeMark === "CGV") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim lớn nhất Việt Nam",
				});
			} else if (this.state.tradeMark === "BHD Star") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim hiện đại",
				});
			} else if (this.state.tradeMark === "Beta Cinemas") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim Beta Cinemas",
				});
			}
		}
	}

	async componentDidUpdate(prevPops) {
		if (this.props.id !== this.state.id) {
			let id = this.props.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				this.setState({
					detailCinema: response.data,
				});
			}
			this.setState({
				id: this.props.id,
				tradeMark: this.state.detailCinema[0].tradeMark,
				rating: this.state.detailCinema[0].rating,
				image: this.state.detailCinema[0].image,
				background: this.state.detailCinema[0].background,
			});
			if (this.state.tradeMark === "Lotte Cinema") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim từ Hàn Quốc",
				});
			} else if (this.state.tradeMark === "CGV") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim lớn nhất Việt Nam",
				});
			} else if (this.state.tradeMark === "BHD Star") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim hiện đại",
				});
			} else if (this.state.tradeMark === "Beta Cinemas") {
				this.setState({
					slogan: "Hệ thống rạp chiếu phim Beta Cinemas",
				});
			}
		}
	}

	render() {
		let { detailCinema, tradeMark, image, background, slogan, rating } =
			this.state;
		return (
			<>
				<div className="cinema-detail-container">
					<div
						className="cinema-detail-content"
						style={{
							backgroundImage: `url(${background})`,
						}}>
						<div className="cinema-detail-header">
							<div
								className="cinema-detail-header-logo"
								style={{
									background: `url(${image})`,
								}}></div>
							<div className="cinema-detail-header-content">
								<div className="cinema-detail-header-title">
									{tradeMark}
								</div>
								<div className="cinema-detail-header-slogan">
									{slogan}
								</div>
								<div className="cinema-detail-header-rating">
									<i class="fas fa-star"></i>
									{rating} / 5
								</div>
								<div className="cinema-detail-header-location">
									<i class="fas fa-map-marker-alt"></i>
									{detailCinema.length} cửa hàng trong hệ thống
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavigationSection);
