import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailCinema.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";
import Footer from "../Section/Footer";
import NavigationSection from "./NavigationSection";
import ShowtimeSection from "./ShowtimeSection";
class DetailCinema extends Component {
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

			id: this.props.match.params.id,
		};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.state.id;
			// let id = this.props.match.params.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				this.setState({
					detailCinema: response.data,
				});
			}
			this.setState({
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
		return (
			<>
				<HomeNavigation />
				<NavigationSection
					detailCinema={this.state.detailCinema}
					tradeMark={this.state.tradeMark}
					rating={this.state.rating}
					image={this.state.image}
					background={this.state.background}
					slogan={this.state.slogan}
					location={this.state.location}
				/>
				<ShowtimeSection id={this.state.id} />
				<Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
