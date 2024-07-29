import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/styles.css';
import NavBarComponent from '../HeaderComponents/NavBarComponent';
import AboutComponent from './AboutComponent';
import NowShowingComponent from './NowShowingComponent';
import ShowTheatreComponent from './ShowTheatreComponent';
import ContactComponent from './ContactComponent';

function HomepageComponent() {
  return (
    <div className='home-container'>
      <NavBarComponent/>
      <AboutComponent/>
      <NowShowingComponent />
      <ShowTheatreComponent />
      <br/>
      <ContactComponent/>
    </div>
  );
}

export default HomepageComponent;