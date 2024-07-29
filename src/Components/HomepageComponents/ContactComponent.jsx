import React from 'react'

function ContactComponent() {
  return (
    <div className='main-container'>
        <div className="container p-10 my-5">
            <div className="row">
                <div className="col">
                    <h1 className="fw-bold">Contact Us</h1>
                </div>
            </div>
            <div className="row py-3">
                <div className="col-md-6">
                    <h5 className="fw-bold color-font">Address</h5>
                    <p className="text-white">
                        AceTickets<br/>
                        123 East Street, <br/>
                        MarineFord, <br/>
                        Chennai, India <br/>
                    </p>
                    <h5 className="fw-bold color-font">Contact</h5>
                    <p className="text-white">
                        Phone: 1234567890<br/>
                        Email: acetickets535@email.com
                    </p>
                </div>
                <div className="col-md-6">
                    <h5 className="py-3 color-font">Socials:</h5>
                    <h4 className="text-white">
                        <i className="bi bi-facebook m-2"></i>
                        <i className="bi bi-google m-2"></i>
                        <i className="bi bi-twitter m-2"></i>
                        <i className="bi bi-instagram m-2"></i>
                    </h4>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactComponent