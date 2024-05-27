import { useState, useEffect } from 'react';
import { Hourglass } from 'react-loader-spinner';

const LoadingSpinner = ({ loading, children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [timerId, setTimerId] = useState(null);

	useEffect(() => {
		if (loading) {
			const timer = setTimeout(() => {
				setIsLoading(true);
			}, 1000);

			setTimerId(timer);
		} else {
			clearTimeout(timerId);
		}
	}, [loading]);

	useEffect(() => {
		if (isLoading && !loading) {
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	}, [loading, isLoading]);

	return isLoading ? (
		<div className='custom-center' style={{ margin: '40px' }}>
			<Hourglass
				visible={true}
				height='80'
				width='80'
				ariaLabel='hourglass-loading'
				wrapperStyle={{}}
				wrapperClass=''
				colors={['#306cce', '#72a1ed']}
			/>
		</div>
	) : (
		children
	);
};

export default LoadingSpinner;
