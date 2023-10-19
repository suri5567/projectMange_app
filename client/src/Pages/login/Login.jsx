import config from '../../config';
import React, { useState, useContext } from 'react';
import imageLogo from '../../assets/Logo.svg';
import '../../styles/LoginPage.css';
import { ContextApi } from '../../contextApi';
import axios from 'axios';

function Login() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [formError, setFormError] = useState({ email: '', password: '' });
	const { login, logout } = useContext(ContextApi);
	const [error, setError] = useState({msg:""});


	async function handleLogin({ email, password }) {
		try {
			const response = await axios.post(`${config.backendBaseUrl}/userAuth/login`, {
				email,
				password
			}, {
				withCredentials: true
			});

			console.log("why", response.msg);
	
			if (response.status == 201) {
				console.log('Login Successful');
				login();
			} 
		} catch (error) {
             
			setError({msg:"Invalid Email or Password!!!"});
			logout();
			
		}
	}
	
	const handleSubmittedForm = (e) => {
		e.preventDefault();

		const isFormValid = validation({ email, password });
		if (isFormValid) {
			handleLogin({ email, password });
		}
	};


	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const validation = (formInfo) => {
		const errors = { email: '', password: '' };

		if (!formInfo.email) {
			errors.email = 'Email is required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formInfo.email)) {
			errors.email = 'Invalid email address';
		}

		if (!formInfo.password) {
			errors.password = 'Password is required';
		} else if (formInfo.password.length < 8) {
			errors.password = 'Password must be at least 8 characters long';
		}

		setFormError(errors);

		return !errors.email && !errors.password;
	};

	const togglePassword = () => {
		setPasswordVisibility(!passwordVisibility);
	};

	return (
		<div className="container d-flex align-items-center justify-content-center">
			<div className="content">
				<div className="image">
					<img src={imageLogo} alt="image" />
				</div>
				<h1>Online Project Management</h1>
				<div className="titleBox">
					<p className="fs-5 mt-4">Login to get started</p>
					{error?.msg && <p style={{ color: 'red', fontSize: 15 }}>{error.msg}</p>}
					<form className="p-4 fs-6 form1" onSubmit={(e) => handleSubmittedForm(e)}>
						<div className="formDec">
							<label>Email</label>
							<input
								type="email"
								name="email"
								onChange={handleEmail}
								value={email}
							/>
							{formError.email && <p style={{ color: 'red', fontSize: '15' }}>{formError.email}</p>}
						</div>
						<div className="formDec mt-4">
							<label htmlFor="password">Password</label>
							<div className="input-group align-items-center">
								<input
									type={passwordVisibility ? 'text' : 'password'}
									className="form-control"
									onChange={handlePassword}
									name="password"
									value={password}
								/>
								<span
									className="input-group-text"
									onClick={togglePassword}
									style={{ cursor: 'pointer' }}
								>
									{passwordVisibility ? (
										<i className="fas fa-eye"></i>
									) : (
										<i className="fas fa-eye-slash"></i>
									)}
								</span>
							</div>
							{formError.password && <p style={{ color: 'red', fontSize: '15' }}>{formError.password}</p>}
						</div>
						<div className="d-flex justify-content-end">
							<p className="passwordbox">Forgot password?</p>
						</div>
						<div className="d-flex justify-content-center mt-3">
							<button className="rounded-5 loginBtnInfo self-align-center" type="submit">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
