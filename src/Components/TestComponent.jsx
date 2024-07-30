import React, { useEffect, useState } from 'react'
import BookingDetailsComponents from './BookingDetailsComponents/BookingDetailsComponents'
import ModalComponent from './NotificationComponents/ModalComponent'
import success from '../assets/images/failure.png';

function TestComponent() {
  const [modalConfig, setModalConfig] = useState({
        show: false,
        title: '',
        message: '',
        imageSrc: '',
        redirectUrl: ''
    });
    useEffect(() =>{
      newModal( 'Time out!','Your booking time has expired. Please try again.', `${success}`,'/');
    },[]);
    const newModal = (title, message, imageSrc, redirectUrl) => {
        setModalConfig({
            show: true,
            title,
            message,
            imageSrc,
            redirectUrl
        });
    };
  return (
    <div>
      {/* <BookingDetailsComponents/> */}
      <ModalComponent show={modalConfig.show} title={modalConfig.title} message={modalConfig.message} imageSrc={modalConfig.imageSrc} redirectUrl={modalConfig.redirectUrl}/>
    </div>
  )
}

export default TestComponent