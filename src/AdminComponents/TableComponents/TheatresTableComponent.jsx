import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axiosInstance from '../../utilities/axiosConfig';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../../styles/TableStyles.css'
import '../../styles/styles.css';
import NavBarComponent from '../../Components/HeaderComponents/NavBarComponent';
import ToastNotification from '../../Components/NotificationComponents/ToastNotification';
import { Link } from 'react-router-dom';

export default function TheatresTable() {
    const [theatres, setTheatres] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalRecords, setTotalRecords] = useState(0);
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
        fetchTheatres();
        newToast('bg-info', 'Click on the location to edit the values');
    }, []);

    const fetchTheatres = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/theatres`, { withCredentials: true });
            setTheatres(response.data);
            setTotalRecords(response.data.length);
        } catch (error) {
            console.error('Error fetching theatres:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateTheatre = async (theatre) => {
        try {
            const { oldLocation, location: newLocation, name } = theatre;

            if (oldLocation && oldLocation !== newLocation) {
                await axiosInstance.put(`/theatres`, {
                    name,
                    oldLocation,
                    newLocation
                }, { 
                    withCredentials: true 
                });
                newToast('bg-success', 'Theatre updated successfully!');
                fetchTheatres();
            } else {
                newToast('bg-warning', 'No changes detected in location!');
            }
        } catch (error) {
            console.error('Error updating theatre:', error);
            newToast('bg-danger', 'Error updating theatre!');
        }
    };


    const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        if (newValue.trim().length === 0) {
            event.preventDefault();
            return;
        }

        // Make a copy of the original location before updating
        const originalLocation = rowData.location;
        rowData[field] = newValue;

        try {
            if (field === 'location' && originalLocation !== newValue) {
                await updateTheatre({ ...rowData, oldLocation: originalLocation });
            } else {
                newToast('bg-warning', 'No changes detected in location!');
            }
        } catch (error) {
            console.error("Error updating theatre:", error);
            newToast('bg-danger', 'Error updating theatre!');
        }
    };

    const locationEditor = (options) => {
        return (
            <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
        );
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <h1 className="text-xl text-900 font-bold">Theatres</h1>
            <div className="flex align-items-center justify-content-end">
                <span className="">
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className="search-bar" />
                </span>
                <Link to='/admin/add-theatre'><Button icon="pi pi-plus" className="ms-2 color-bg border border-none rounded" id='color-btn' label="Add Theatre" /></Link>
            </div>
        </div>
    );

    const footer = `In total there are ${totalRecords} theatres.`;

    return (
        <div className='data-table home-container mx-4'>
            <NavBarComponent />
            <DataTable
                value={theatres}
                header={header}
                footer={footer}
                loading={loading}
                globalFilter={globalFilter}
                emptyMessage="No theatres found."
                showGridlines
                scrollable
                scrollHeight="calc(100vh - 100px)"
                editMode="cell"
                paginator
                rows={5}
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column field="id" header="ID" sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="name" header="Name" sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
                <Column field="location" header="Location" onCellEditComplete={onCellEditComplete} editor={(options) => locationEditor(options)} sortable filter headerStyle={{ backgroundColor: "#FF725E", color: "#1f1f1f" }}></Column>
            </DataTable>
            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    );
}