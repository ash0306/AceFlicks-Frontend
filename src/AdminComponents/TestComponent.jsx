import React, { useEffect, useState } from 'react'
import AddMovieComponent from './FormComponents/AddMovieComponent'
import AddShowtimeComponent from './FormComponents/AddShowtimeComponent'
import AddTheatreComponent from './FormComponents/AddTheatreComponent'

function TestComponent() {
  return (
    <div className='home-container'>
      <AddTheatreComponent/>
    </div>
  )
}

export default TestComponent