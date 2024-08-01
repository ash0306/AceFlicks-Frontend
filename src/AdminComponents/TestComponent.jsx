import React, { useEffect, useState } from 'react'
// import NewComponent from './NewComponent'
import MoviesTable from './TableComponents/MoviesTableComponent'
import BookingsTable from './TableComponents/BookingsTableComponent'
import ShowtimesTable from './TableComponents/ShowtimesTableComponent'
import TheatresTable from './TableComponents/TheatresTableComponent'
import AdminDashboardComponents from './AdminDashboardComponents'

function TestComponent() {
  return (
    <div className='home-container'>

      {/* <BookingsTable/> */}
      {/* <MoviesTable/> */}
      {/* <ShowtimesTable/> */}
      {/* <TheatresTable/> */}
      <AdminDashboardComponents/>
    </div>
  )
}

export default TestComponent