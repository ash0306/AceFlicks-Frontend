import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import axiosInstance from '../utilities/axiosConfig';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './TableStyles.css';
import NavBarComponent from '../Components/HeaderComponents/NavBarComponent';
import ToastNotification from '../Components/NotificationComponents/ToastNotification';

export default function MoviesTable() {
    const [movies, setMovies] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });
    const rowsPerPage = 5;

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/movies`, { withCredentials: true });
            console.log(response.data);
            setMovies(response.data);
            setTotalRecords(response.data.length);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

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

    const imageBodyTemplate = (movie) => {
        return <img src={movie.imageUrl} alt={movie.title} style={{height:'100px'}} className="w-6rem shadow-2 border-round" />;
    };

    const dateBodyTemplate = (date) => {
        return new Date(date).toLocaleDateString('en-GB');
    };

    const statusBodyTemplate = (movie) => {
        return <Tag value={movie.status} severity={getSeverity(movie)}></Tag>;
    };

    const getSeverity = (movie) => {
        switch (movie.status) {
            case 'Running':
                return 'success';
            case 'NotRunning':
                return 'danger';
            default:
                return null;
        }
    };

    const updateMovie = async (title, duration, startDate, endDate, status) => {
        console.log('inside updatemovie')
        await axiosInstance.put('/movies', {
            title: title,
            duration: duration,
            startDate: startDate,
            endDate: endDate,
            status: status
        }, {
            withCredentials: true
        }).then(response => {
            console.log(response);
            fetchMovies();
        })
        .catch(error => {
            console.error('Error updating movie:', error);
            setError('Failed to update movie.');
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
            console.log('insisde try')
            await updateMovie(rowData.title, rowData.duration, rowData.startDate, rowData.endDate, rowData.status);
        } catch (error) {
            console.error("Error updating movie:", error);
            setError("Failed to update movie.");
        }
    };

    const durationEditor = (options) => {
        return (
            <InputText type="number" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
        );
    };

    const dateEditor = (options) => {
        return (
            <Calendar value={new Date(options.value)} onChange={(e) => options.editorCallback(e.value)} dateFormat="dd/mm/yy" showIcon />
        );
    };

    const statusEditor = (options) => {
        const statuses = [
            { label: 'Running', value: 'Running' },
            { label: 'Not Running', value: 'NotRunning' }
        ];
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status" />
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <h1 className="text-xl text-900 font-bold">Movies</h1>
            <div className="flex align-items-center justify-content-end">
                <span className="">
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="search-bar" />
                </span>
                <Button icon="pi pi-plus" className="ms-2 color-bg border border-none rounded" id='color-btn' label="Add Movie" />
            </div>
        </div>
    );

    const footer = `In total there are ${totalRecords} movies.`;

    return (
        <div className='data-table home-container mx-4'>
            <NavBarComponent />
            <DataTable
                value={movies}
                header={header}
                footer={footer}
                loading={loading}
                globalFilter={globalFilter}
                emptyMessage="No movies found."
                showGridlines
                scrollable
                scrollHeight="calc(100vh - 100px)"
                editMode="cell"
                paginator
                rows={rowsPerPage}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} header="Image" body={imageBodyTemplate}></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="title" header="Title" sortable filter ></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="synopsis" header="Synopsis" sortable filter ></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="genre" header="Genre" sortable filter></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="language" header="Language" sortable filter></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="duration" header="Duration (min)" sortable filter onCellEditComplete={onCellEditComplete} editor={(options) => durationEditor(options)}></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="startDate" header="Start Date" body={(rowData) => dateBodyTemplate(rowData.startDate)} sortable filter onCellEditComplete={onCellEditComplete} editor={(options) => dateEditor(options)}></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} field="endDate" header="End Date" body={(rowData) => dateBodyTemplate(rowData.endDate)} sortable filter onCellEditComplete={onCellEditComplete} editor={(options) => dateEditor(options)}></Column>
                <Column headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }} header="Status" body={statusBodyTemplate} sortable filter onCellEditComplete={onCellEditComplete} editor={(options) => statusEditor(options)}></Column>
            </DataTable>

            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    );
}