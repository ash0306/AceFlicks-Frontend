import React, { useEffect, useState } from 'react'
// import NewComponent from './NewComponent'
import MoviesTable from './MoviesTableComponent'
import BookingsTable from './BookingsTableComponent'

function TestComponent() {
  return (
    <div className='home-container'>

      {/* <BookingsTable/> */}
      <MoviesTable/>
    </div>
  )
}

export default TestComponent