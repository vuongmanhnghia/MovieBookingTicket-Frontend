import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
// import UserManage from "../containers/System/UserManage";
import MovieManage from "../containers/System/Admin/MovieManage";
import UserManage from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ShowtimeManage from "../containers/System/Admin/ShowtimeManage";
import CinemaManage from "../containers/System/Admin/CinemaManage";
import ScreenManage from "../containers/System/Admin/ScreenManage";
import CustomScrollbars from "../components/CustomScrollbars";
class System extends Component {
	render() {
		const { systemMenuPath, isLoggedIn } = this.props;
		return (
			<React.Fragment>
				<CustomScrollbars style={{ height: "100vh", width: "100%" }}>
					{isLoggedIn && <Header />}
					<div className="system-container">
						<div className="system-list">
							<Switch>
								<Route
									path="/system/user-manage"
									component={UserManage}
								/>
								<Route
									path="/system/manage-movie"
									component={MovieManage}
								/>
								<Route
									path="/system/manage-showtime"
									component={ShowtimeManage}
								/>
								<Route
									path="/system/manage-cinema"
									component={CinemaManage}
								/>
								<Route
									path="/system/manage-screen"
									component={ScreenManage}
								/>
								<Route
									component={() => {
										return <Redirect to={systemMenuPath} />;
									}}
								/>
							</Switch>
						</div>
					</div>
				</CustomScrollbars>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		systemMenuPath: state.app.systemMenuPath,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
