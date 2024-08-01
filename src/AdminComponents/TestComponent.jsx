import React, { useEffect, useState } from 'react'
// import NewComponent from './NewComponent'
import MoviesTable from './TableComponents/MoviesTableComponent'
import BookingsTable from './TableComponents/BookingsTableComponent'
import ShowtimesTable from './TableComponents/ShowtimesTableComponent'

function TestComponent() {
  return (
    <div className='home-container'>

      {/* <BookingsTable/> */}
      {/* <MoviesTable/> */}
      <ShowtimesTable/>
    </div>
  )
}

export default TestComponent