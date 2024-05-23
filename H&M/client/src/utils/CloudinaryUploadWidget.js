import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../App.css';
import '../style/common.style.css';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const CloudinaryUploadWidget = ({ uploadImage }) => {
	useEffect(() => {
		const myWidget = window.cloudinary.createUploadWidget(
			{
				cloudName: CLOUDNAME,
				uploadPreset: UPLOADPRESET,
			},
			(error, result) => {
				if (!error && result && result.event === 'success') {
					uploadImage(result.info.secure_url);
				}
			}
		);

		const myWidgetOpen = () => {
			myWidget.open();
		};

		document.getElementById('upload_widget')?.addEventListener('click', myWidgetOpen);

		return () => {
			document.getElementById('upload_widget')?.removeEventListener('click', myWidgetOpen);
		};
	}, [uploadImage]);

	return (
		<Button id='upload_widget' size='sm' className='ml-2'>
			Upload Image +
		</Button>
	);
};

export default CloudinaryUploadWidget;
