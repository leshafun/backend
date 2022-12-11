import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(password, email);
    }

    return (
        <div className="register login">
            <h2 className='login__name'>Регистрация</h2>
            <form className='login__form' onSubmit={handleSubmit}>
                    <input id='register-email' type='email' name='user-email' className='login__input' placeholder='Email' required
                        value={email} onChange={({ target }) => setEmail(target.value)} />
                    <input id='register-password' type='password' name='user-password' className='login__input' placeholder='Пароль' required
                        value={password} onChange={({ target }) => setPassword(target.value)} />
                <button type='submit' className='login__button-save'>Зарегистрироваться</button>
            </form>
            <p className='login__text'>Уже зарегистрированы? <Link to='/signin' className='login__link login__text'>Войти</Link></p>
        </div>
    )
}

export default Register;    