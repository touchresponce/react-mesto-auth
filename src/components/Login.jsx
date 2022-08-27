import React from "react";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.username || !this.state.password) {
      return;
    }
    this.props.handleLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form
          className="login__form"
          name="login-form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="login__input"
            type="email"
            name="username"
            id="username"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            className="login__input"
            type="password"
            name="password"
            id="password-input"
            placeholder="Пароль"
            minLength="2"
            maxLength="20"
            required
            autoComplete="off"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
