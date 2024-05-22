import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './style/common.style.css';
import AppLayout from './Layout/AppLayout';
import AppRouter from './routes/AppRouter';

const App = () => {
	return (
		<div>
			<AppLayout>
				<AppRouter />
			</AppLayout>
		</div>
	);
};

export default App;
