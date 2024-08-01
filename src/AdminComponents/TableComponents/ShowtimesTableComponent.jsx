import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import axiosInstance from '../../utilities/axiosConfig';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../../styles/TableStyles.css'
import '../../styles/styles.css';
import NavBarComponent from '../../Components/HeaderComponents/NavBarComponent';
import ToastNotification from '../../Components/NotificationComponents/ToastNotification';
import { Tag } from 'primereact/tag';
import { Link } from 'react-router-dom';

export default function ShowtimesTable() {
    const [showtimes, setShowtimes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedShowtimes, setSelectedShowtimes] = useState([]);
    const [selectedShowtimeIds, setSelectedShowtimeIds] = useState([]);
    const rowsPerPage = 5;
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });

    const newToast = (classBackground, message) => {
        setToastConfig({
        show: true,
        classBackground,
        message,
        });
    };

    const closeToast = () => {
        setToastConfig((prevState) => ({ ...prevState, show: false }));
    };

    useEffect(() => {
        fetchShowtimes();
        newToast('bg-info', 'Click on the start/end time, total seat, or ticket price to edit the values')
    }, []);

    const fetchShowtimes = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/showtimes`, { withCredentials: true });
            setShowtimes(response.data);
            setTotalRecords(response.data.length);
        } catch (error) {
            console.error('Error fetching showtimes:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateShowtime = async (showtime) => {
        await axiosInstance.put(`/showtimes`, {
            id: showtime.id,
            startTime: showtime.startTime,
            endTime: showtime.startTime,
            totalSeats: showtime.totalSeats,
            ticketPrice: showtime.ticketPrice
        }, { 
            withCredentials: true 
        }).then(response => {
            console.log(response);
            newToast('bg-success', 'Showtime updated successfully!');
            fetchShowtimes();
        })
        .catch(error => {
            console.error('Error updating showtime:', error);
        });
    };

    const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (newValue.trim().length === 0) {
            event.preventDefault();
            return;
        }

        rowData[field] = newValue;

        try {
            await updateShowtime(rowData);
        } catch (error) {
            console.error("Error updating showtime:", error);
        }
    };

    const dateEditor = (options) => {
        return (
            <Calendar value={new Date(options.value)} onChange={(e) => options.editorCallback(e.value)} dateFormat="dd/mm/yy" showIcon />
        );
    };

    const numberEditor = (options) => {
        return (
            <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
        );
    };

    const onSelectionChange = (e) => {
        setSelectedShowtimes(e.value);
        setSelectedShowtimeIds(e.value.map(showtime => showtime.id));
    };

    const statusBodyTemplate = (showtime) => {
        return <Tag value={showtime.status} severity={getSeverity(showtime)}></Tag>;
    };

    const getSeverity = (showtime) => {
        switch (showtime.status) {
            case 'Active':
                return 'success';
            case 'Inactive':
                return 'danger';
            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <h1 className="text-xl text-900 font-bold">Showtimes</h1>
            <div className="flex align-items-center justify-content-end">
                <span className="">
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="search-bar" />
                </span>
                <Link to='/admin/add-showtime'><Button icon="pi pi-plus" className="ms-2 color-bg border border-none rounded" id='color-btn' label="Add Showtime" /></Link>
            </div>
        </div>
    );

    const footer = `In total there are ${totalRecords} showtimes.`;

    return (
        <div className='data-table home-container mx-4'>
            <NavBarComponent />
            <DataTable
                value={showtimes}
                header={header}
                footer={footer}
                loading={loading}
                globalFilter={globalFilter}
                emptyMessage="No showtimes found."
                showGridlines
                scrollable
                scrollHeight="calc(100vh - 100px)"
                editMode="cell"
                paginator
                rows={rowsPerPage}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                selection={selectedShowtimes}
                onSelectionChange={onSelectionChange}
                onCellEditComplete={onCellEditComplete}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em', backgroundColor: "#FF725E" }}></Column>
                <Column field="id" header="ID" sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="startTime" header="Start Time" body={(rowData) => new Date(rowData.startTime).toLocaleString('en-GB')} editor={(options) => dateEditor(options)} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="endTime" header="End Time" body={(rowData) => new Date(rowData.endTime).toLocaleString('en-GB')} editor={(options) => dateEditor(options)} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="status" header="Status" body={statusBodyTemplate} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="movie" header="Movie" sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="theatre" header="Theatre" body={(rowData) => `${rowData.theatre} - ${rowData.theatreLocation}`} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="totalSeats" header="Total Seats" editor={(options) => numberEditor(options)} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="availableSeats" header="Available Seats" sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="ticketPrice" header="Ticket Price" editor={(options) => numberEditor(options)} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
            </DataTable>
            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    );
}