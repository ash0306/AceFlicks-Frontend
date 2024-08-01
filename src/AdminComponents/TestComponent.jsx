import React, { useEffect, useState } from 'react'
import AddMovieComponent from './FormComponents/AddMovieComponent'
import AddShowtimeComponent from './FormComponents/AddShowtimeComponent'

function TestComponent() {
  return (
    <div className='home-container'>
      <AddShowtimeComponent/>
    </div>
  )
}

export default TestComponent