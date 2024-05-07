import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginWithEmailMutation } from '../hooks/apis/user/useLoginWithEmail';

const LoginPage = () => {
	const navigate = useNavigate();
	const { mutateAsync: loginWithEmail } = useLoginWithEmailMutation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			if (email === '' || password === '') throw new Error('아이디와 비밀번호를 입력해주세요');

			const response = await loginWithEmail({ email, password });
			if (response.status === 200) {
				sessionStorage.setItem('token', response.data.token);
				console.log('token save: ', response.data.token);
				navigate('/');
			}
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='display-center'>
			<Form className='login-box' onSubmit={onSubmit}>
				<h1>로그인</h1>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div className='button-box'>
					<Button type='submit' className='button-primary'>
						Login
					</Button>
					<span>
						계정이 없다면? <Link to='/register'>회원가입 하기</Link>
					</span>
				</div>
			</Form>
		</div>
	);
};

export default LoginPage;
