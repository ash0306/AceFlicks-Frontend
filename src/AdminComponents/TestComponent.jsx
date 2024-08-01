import React, { useEffect, useState } from 'react'
// import NewComponent from './NewComponent'
import MoviesTable from './TableComponents/MoviesTableComponent'
import BookingsTable from './TableComponents/BookingsTableComponent'

function TestComponent() {
  return (
    <div className='home-container'>

      {/* <BookingsTable/> */}
      <MoviesTable/>
    </div>
  )
}

export default TestComponent