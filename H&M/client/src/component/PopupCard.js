import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

const PopupCard = ({ showPopup, setShowPopup }) => {
	return (
		<Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
			<Modal.Body className='text-center' onClick={() => setShowPopup(false)}>
				<img src={'/image/sale.jpg'} width={'100%'} />
			</Modal.Body>
		</Modal>
	);
};

export default PopupCard;
