import React, { Component } from "react";
import { connect } from "react-redux";
import HomeNavigation from "../HomeNavigation";
import "./DetailCinema.scss";
import { getDetailCinemaService } from "../../../services/cinemaService";
class DetailCinema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailMovie: {},
			tradeMark: "",
			name: "",
			location: "",
			rating: "",
			image: "",
			background: "",
		};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.props.match.params.id;
			let response = await getDetailCinemaService(id);
			if (response && response.errCode === 0) {
				this.setState({
					detailMovie: response.data,
				});
			}
			this.setState({
				tradeMark: this.state.detailMovie.tradeMark,
				name: this.state.detailMovie.name,
				location: this.state.detailMovie.location,
				rating: this.state.detailMovie.rating,
				image: this.state.detailMovie.image,
				background: this.state.detailMovie.background,
			});
		}
	}

	render() {
		return (
			<>
				<HomeNavigation />
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
	return {
		// fetchAllCinemas: () => dispatch(actions.fetchAllCinemas()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCinema);
