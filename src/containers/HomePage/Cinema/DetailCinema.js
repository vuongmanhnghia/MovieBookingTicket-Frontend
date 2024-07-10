import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationSection from "./NavigationSection";
import ShowtimeSection from "./ShowtimeSection";
import HeaderShowtime from "../Showtime/HeaderShowtime";
import CustomScrollbars from "../../../components/CustomScrollbars";
import Footer from "../Section/Footer";
import * as actions from "../../../store/actions";

class DetailCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tradeMark: "",
		};
	}

	async componentDidMount() {
		if (this.props.match.params.id) {
			let id = this.props.match.params.id;
			await this.props.fetchDetailCinema(id);
			await this.props.fetchDetailTradeMark(id);
			this.setState({
				imageTradeMark: this.props.detailTradeMark.image,
			});
		}
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			let id = this.props.match.params.id;
			await this.props.fetchDetailCinema(id);
			await this.props.fetchDetailTradeMark(id);
			this.setState({
				imageTradeMark: this.props.detailTradeMark.image,
			});
		}
	}

	handleGetQuantityCinema = (quantity) => {
		this.setState({
			quantity: quantity,
		});
	};

	render() {
		let { detailCinema, detailTradeMark } = this.props;
		let { imageTradeMark, quantity } = this.state;
		return (
			<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
				<NavigationSection
					detailTradeMark={detailTradeMark}
					quantity={quantity}
				/>
				<HeaderShowtime tradeMark={detailTradeMark.tradeMark} />
				<ShowtimeSection
					handleGetQuantityCinema={this.handleGetQuantityCinema}
					detailCinema={detailCinema}
					imageTradeMark={imageTradeMark}
				/>
				<Footer />
			</CustomScrollbars>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		detailCinema: state.cinema.detailCinema,
		detailTradeMark: state.cinema.detailTradeMark,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchDetailCinema: (id) => dispatch(actions.fetchDetailCinema(id)),
		fetchDetailTradeMark: (name) =>
			dispatch(actions.fetchDetailTradeMark(name)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
