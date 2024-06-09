import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'

const DeleteDialog = ({ sku ,showDialog, setShowDialog, deleteStock }) => {
    return (
      <Modal show={showDialog} onHide={() => setShowDialog(false)} centered>
        <Modal.Body className="text-center">
          <p>{sku} Product를 삭제하시겠습니까?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button size='sm' onClick={() => setShowDialog(false)}>
            취소
          </Button>
          <Button variant='danger' size='sm' onClick={() => deleteStock()}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default DeleteDialog