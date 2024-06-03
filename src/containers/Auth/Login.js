import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			isShowPassword: false,
		};
	}
	handleOnChangeUsername = (event) => {
		this.setState({
			username: event.target.value,
		});
	};

	handleOnChangePassword = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	handleLogin = (e) => {
		console.log("Login");
		console.log(
			"Username",
			this.state.username,
			"Password",
			this.state.password
		);
	};

	handleShowPassword = () => {
		this.setState({
			isShowPassword: !this.state.isShowPassword,
		});
	};

	render() {
		return (
			<div className="background">
				<div className="container">
					<div className="login-section row">
						<header className="col-12 text-center">Login</header>
						<div className="social-buttons col-12 form-group">
							<button className="google">
								<i className="fab fa-google"></i>Use Google
							</button>
							<button className="facebook">
								<i className="fab fa-facebook-f"></i>Use Facebook
							</button>
						</div>
						<div className="separator col-12 form-group">
							<div className="line"></div>
							<p>Or</p>
							<div className="line"></div>
						</div>
						<div className="login-section col-12">
							<input
								type="text"
								className="form-control"
								placeholder="Username"
								value={this.state.username}
								onChange={(event) => this.handleOnChangeUsername(event)}
							/>
							<div className="custom-input-pasword">
								<input
									type={
										this.state.isShowPassword ? "text" : "password"
									}
									className="form-control"
									placeholder="Password"
									required
									value={this.state.password}
									onChange={(event) =>
										this.handleOnChangePassword(event)
									}
								/>
								<span
									onClick={() => {
										this.handleShowPassword();
									}}>
									<i
										className={
											this.state.isShowPassword
												? "fas fa-eye"
												: "fas fa-eye-slash"
										}></i>
								</span>
							</div>
							<div className="col-12">
								<button
									className="btn-login"
									onClick={() => this.handleLogin()}>
									Login
								</button>
							</div>
							<span className="forgot-password">Forgot Password</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		language: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		adminLoginSuccess: (adminInfo) =>
			dispatch(actions.adminLoginSuccess(adminInfo)),
		adminLoginFail: () => dispatch(actions.adminLoginFail()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
