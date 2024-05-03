import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useCreateUserMutation } from '../hooks/apis/user/useCreateUser';

const RegisterPage = () => {
	const navigate = useNavigate();
	const { mutateAsync: createUser } = useCreateUserMutation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleInput = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case 'name':
				setName(value);
				break;
			case 'email':
				setEmail(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			default:
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				throw new Error('패스워드가 일치하지 않습니다.');
			}

			const result = await createUser({ name, email, password });

			if (result.status === 200) navigate('/login');
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div className='display-center'>
			<Form className='login-box' onSubmit={onSubmit}>
				<h1>회원가입</h1>
				<Form.Group className='mb-3' controlId='formName'>
					<Form.Label>Name</Form.Label>
					<Form.Control name='name' type='string' placeholder='Name' value={name} onChange={handleInput} />
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name='email'
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={handleInput}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						name='password'
						type='password'
						placeholder='Password'
						value={password}
						onChange={handleInput}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>re-enter the password</Form.Label>
					<Form.Control
						name='confirmPassword'
						type='password'
						placeholder='re-enter the password'
						value={confirmPassword}
						onChange={handleInput}
					/>
				</Form.Group>

				<Button className='button-primary' type='submit'>
					회원가입
				</Button>
			</Form>
		</div>
	);
};

export default RegisterPage;
