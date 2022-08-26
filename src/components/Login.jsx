export default function Login() {
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" name="login-form">
        <input
          className="login__input"
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          autoComplete="off"
          //   onChange={handleNameInput}
          //   value={values.name || ''}
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
          //   onChange={handleInfoInput}
          //   value={values.info || ''}
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
