import React, { Component } from "react";
import { connect } from "react-redux";
import "./NavigationSection.scss";
import LoadingSkeleton from "../LoadingSkeleton";

class NavigationSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	async componentDidMount() {
		setTimeout(() => {
			this.setState({
				loading: false,
			});
		}, 300);
	}

	async componentDidUpdate(prevPops) {}

	render() {
		let { background, image, tradeMark, rating } = this.props.detailTradeMark;
		let { loading } = this.state;
		let { quantity } = this.props;
		return (
			<>
				<div className="cinema-detail-container">
					{loading && (
						<LoadingSkeleton style={{ width: "100%", height: "440px" }} />
					)}
					{!loading && (
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
									{/* <div className="cinema-detail-header-slogan">
									{slogan}
								</div> */}
									<div className="cinema-detail-header-rating">
										<i class="fas fa-star"></i>
										{rating}
									</div>
									<div className="cinema-detail-header-location">
										<i class="fas fa-map-marker-alt"></i>
										{quantity} cửa hàng trong hệ thống
									</div>
								</div>
							</div>
						</div>
					)}
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
