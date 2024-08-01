import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import axiosInstance from '../../utilities/axiosConfig';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './TableStyles.css';
import NavBarComponent from '../../Components/HeaderComponents/NavBarComponent';

export default function BookingsTable() {
    const [bookings, setBookings] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const rowsPerPage = 10;

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/bookings`, { withCredentials: true });
            setBookings(response.data);
            setTotalRecords(response.data.length);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const statusBodyTemplate = (booking) => {
        return <Tag value={booking.status} severity={getSeverity(booking)}></Tag>;
    };

    const getSeverity = (booking) => {
        switch (booking.status) {
            case 'Booked':
                return 'success';
            case 'Cancelled':
                return 'danger';
            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <h1 className="text-xl text-900 font-bold">Bookings</h1>
            <div className="flex align-items-center justify-content-end">
                <span className="">
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="search-bar" />
                </span>
                <Button icon="pi pi-plus" id='color-btn' className="ms-2 color-bg border border-none rounded" label="Add Movie" />
            </div>
        </div>
    );

    const footer = `In total there are ${totalRecords} bookings.`;

    return (
        <div className='data-table bookings-table mx-4'>
            <NavBarComponent />
            <DataTable
                value={bookings}
                header={header}
                footer={footer}
                loading={loading}
                globalFilter={globalFilter}
                emptyMessage="No bookings found."
                showGridlines
                scrollable
                paginator
                rows={5}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                // scrollHeight="calc(100vh - 100px)"
            >
                <Column field="id" header="ID" sortable filter headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
                <Column field="userId" header="User ID" sortable filter headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
                <Column field="showtimeId" header="Showtime ID" sortable filter headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
                <Column field="bookingTime" header="Booking Time" body={(rowData) => new Date(rowData.bookingTime).toLocaleDateString('en-GB')} sortable filter headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
                <Column field="totalPrice" header="Total Price" sortable filter headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
                <Column header="Status" body={statusBodyTemplate} sortable headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
                <Column header="Seats" body={(rowData) => rowData.seats.length > 0 ? rowData.seats.join(', ') : 'No seats selected'} headerStyle={{ backgroundColor: '#FF725E', color: '#fff' }}></Column>
            </DataTable>
        </div>
    );
}