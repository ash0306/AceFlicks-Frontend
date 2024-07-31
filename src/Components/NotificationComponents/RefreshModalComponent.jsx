// CustomModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RefreshModal = ({ show, onHide, onContinue, onCancel }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header data-bs-backdrop='static' data-bs-keyboard='false'>
        <Modal.Title>Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Refreshing can make you lose your data. Do you want to continue?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onCancel}>Cancel</Button>
        <Button variant="danger" onClick={onContinue}>Continue</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RefreshModal;