import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalComponent = ({ show, title, message, imageSrc, redirectUrl }) => {
  // const [show, setShow] = useState();
  const handleClose = () => {
    navigate(redirectUrl);
  }
  const navigate = useNavigate();
  return (
    <Modal show={show} centered>
      <Modal.Header className="d-flex justify-content-between align-items-center" data-bs-backdrop='static' data-bs-keyboard='false'>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {imageSrc && <img src={imageSrc} alt="modal" className="img-fluid mb-3" style={{height: '300px'}}/>}
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalComponent