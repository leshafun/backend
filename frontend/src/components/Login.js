import React from "react";

function Login({ onLogin }) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');


	const handleSubmit = (e) => {
		e.preventDefault();
		onLogin(password, email);
	}


	return (
		<div className="login">
			<h2 className='login__name'>Вход</h2>
			<form className='login__form' onSubmit={handleSubmit}>
					<input id='login-email' type='email' name='user-email' className='login__input' placeholder='Email' required
						value={email} onChange={({ target }) => setEmail(target.value)} />
					<input id='login-password' type='password' name='user-password' className='login__input' placeholder='Пароль' required
						value={password} onChange={({ target }) => setPassword(target.value)} />
				<button type='submit' className='login__button-save'>Войти</button>
			</form>
		</div>
	)
}

export default Login;