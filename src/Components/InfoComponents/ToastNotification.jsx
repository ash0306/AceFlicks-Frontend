import React, { useRef } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ classBackground, message, show, onClose }) => {
  const toastRef = useRef(null);

  return (
    <ToastContainer className="p-3 position-fixed top-0 end-0" style={{ zIndex: 5 }}>
      <Toast
        ref={toastRef}
        onClose={onClose}
        show={show}
        className={`toast align-items-center text-white border-0 ${classBackground}`}
      >
        <div className="d-flex">
          <Toast.Body>{message}</Toast.Body>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;