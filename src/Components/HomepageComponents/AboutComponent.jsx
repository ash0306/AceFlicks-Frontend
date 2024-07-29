import React from 'react'
import intro from '../../assets/images/intro.png'

function AboutComponent() {
  return (
    <div className='home-container'>
        <div className="container p-3 my-5" id="div-container">
            <div className="row">
                <div className="col-md-6 text-center" data-aos="fade-right">
                    <h1 className="fw-bold display-1 text-start p-3">
                        <span>Where Every Seat Holds a Story </span>
                        <span className='color-font'>AceTickets</span>
                        <span>!</span>
                    </h1>
                </div>
                <div className="col-md-6 d-flex justify-content-center" data-aos="fade-left">
                    <img src={intro} alt="AceTickets" className="img-fluid" style={{height:"400px"}}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutComponent