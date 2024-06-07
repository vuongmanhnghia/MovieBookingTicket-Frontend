import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
	render() {
		let settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 5,
		};
		return (
			<div className="section-specialty">
				<div className="specialty-container">
					<div className="specialty-header">
						<span>Phim đang chiếu</span>
					</div>
					<div className="specialty-body">
						<Slider {...settings}>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
							<div className="specialty-customize">
								<div className="bg-image" />
								<div className="title-movie">
									Haikyu!!: Trận Chiến Bãi Phế Liệu
								</div>
								<div className="category">Hoạt hình, chính kịch</div>
								<div className="rate">
									<i className="fas fa-star"></i> 9.8
								</div>
							</div>
						</Slider>
					</div>
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
