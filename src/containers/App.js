import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
	userIsAuthenticated,
	userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import HomePage from "./HomePage/HomePage.js";
import DetailMovie from "./HomePage/Movie/DetailMovie";
import DetailCinema from "./HomePage/Cinema/DetailCinema";
import DetailShowtime from "./HomePage/Showtime/DetailShowtime";
import MovieComponent from "./HomePage/Movie/MovieComponent.js";
import ReviewMovie from "./HomePage/Review/ReviewMovie.js";
import HomeNavigation from "./HomePage/HomeNavigation.js";
import Footer from "./HomePage/Section/Footer.js";
import CinemaComponent from "./HomePage/Cinema/CinemaComponent.js";
import CinemaShowtime from "./HomePage/Cinema/CinemaShowtime.js";

class App extends Component {
	handlePersistorState = () => {
		const { persistor } = this.props;
		let { bootstrapped } = persistor.getState();
		if (bootstrapped) {
			if (this.props.onBeforeLift) {
				Promise.resolve(this.props.onBeforeLift())
					.then(() => this.setState({ bootstrapped: true }))
					.catch(() => this.setState({ bootstrapped: true }));
			} else {
				this.setState({ bootstrapped: true });
			}
		}
	};

	componentDidMount() {
		this.handlePersistorState();
	}

	render() {
		return (
			<Fragment>
				<Router history={history}>
					<div className="main-container">
						<div className="content-container">
							<Switch>
								<Route
									path={path.LOGIN}
									component={userIsNotAuthenticated(Login)}
								/>
								<Route
									path={path.SYSTEM}
									component={userIsAuthenticated(System)}
								/>
							</Switch>
							{/* <CustomScrollbars
								style={{ height: "100vh", width: "100%" }}> */}
							<HomeNavigation />
							<Switch>
								<Route path={path.HOME} exact component={Home} />

								<Route path={path.HOMEPAGE} component={HomePage} />
								<Route
									path={path.DETAIL_MOVIE}
									component={DetailMovie}
								/>
								<Route
									path={path.DETAIL_CINEMA}
									component={DetailCinema}
								/>
								<Route
									path={path.DETAIL_SHOWTIME}
									component={DetailShowtime}
								/>
								<Route
									path={path.ALL_MOVIE}
									component={MovieComponent}
								/>
								<Route
									path={path.REVIEW_MOVIE}
									component={ReviewMovie}
								/>
								<Route
									path={path.ALL_CINEMA}
									component={CinemaComponent}
								/>
								<Route
									path={path.CINEMA_SHOWTIME}
									component={CinemaShowtime}
								/>
							</Switch>
							<Footer />
							{/* </CustomScrollbars> */}
						</div>

						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</div>
				</Router>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		started: state.app.started,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
