import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

function App() {
	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route path='/' element={<TodoPage />} />
			</Route>
		</Routes>
	);
}

export default App;
