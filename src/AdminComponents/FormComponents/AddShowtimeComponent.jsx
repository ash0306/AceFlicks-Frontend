import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useFormValidation from '../../utilities/useFormValidation';
import NavBarComponent from '../../Components/HeaderComponents/NavBarComponent';
import axiosInstance from '../../utilities/axiosConfig';
import ToastNotification from '../../Components/NotificationComponents/ToastNotification';

function AddShowtimeComponent() {
    useFormValidation();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [movieId, setMovieId] = useState('');
    const [theatreId, setTheatreId] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [movies, setMovies] = useState([]);
    const [theatres, setTheatres] = useState([]);

    useEffect(() => {
        fetchMovies();
        fetchTheatres();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axiosInstance.get('/movies',{
                withCredentials: true
            });
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const fetchTheatres = async () => {
        try {
            const response = await axiosInstance.get('/theatres',{
                withCredentials: true
            });
            setTheatres(response.data);
        } catch (error) {
            console.error('Error fetching theatres:', error);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setIsLoading(true);
            await axiosInstance.post('/showtimes', {
                startTime: startTime,
                endTime: endTime,
                movieId: movieId,
                theatreId: theatreId,
                totalSeats: totalSeats,
                ticketPrice: ticketPrice
            }, {
                withCredentials: true,
            })
                .then(response => {
                    console.log(response);
                    newToast("bg-success", "Showtime added successfully!");
                })
                .catch(error => {
                    console.error('Error adding showtime:', error);
                    newToast("bg-danger", "Error adding showtime!");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        setValidated(true);
    };

    return (
        <div className='main-container'>
            <NavBarComponent />
            <div className="container p-3 text-dark">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6 container border rounded shadow-lg" id="card-form">
                        <div className="row d-flex">
                            <div className="py-5 col-12">
                                <div>
                                    <h1 className="text-center">ADD <span className='color-font'>SHOWTIME</span></h1>
                                </div>
                                <form className="container needs-validation" noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                                    <div className="row m-3">
                                        <label htmlFor="movieId" className="form-label">Movie</label>
                                        <select
                                            className="form-control"
                                            id="movieId"
                                            required
                                            value={movieId}
                                            onChange={(e) => setMovieId(e.target.value)}
                                        >
                                            <option value="">Select a movie</option>
                                            {movies.map(movie => (
                                                <option key={movie.id} value={movie.id}>{movie.title}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">Please select a movie.</div>
                                        <div className="valid-feedback">Valid movie</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="theatreId" className="form-label">Theatre</label>
                                        <select
                                            className="form-control"
                                            id="theatreId"
                                            required
                                            value={theatreId}
                                            onChange={(e) => setTheatreId(e.target.value)}
                                        >
                                            <option value="">Select a theatre</option>
                                            {theatres.map(theatre => (
                                                <option key={theatre.id} value={theatre.id}>{theatre.name} - {theatre.location}</option>
                                            ))}
                                        </select>
                                        <div className="invalid-feedback">Please select a theatre.</div>
                                        <div className="valid-feedback">Valid theatre</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="startTime" className="form-label">Start Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="startTime"
                                            required
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a start time.</div>
                                        <div className="valid-feedback">Valid start time</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="endTime" className="form-label">End Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            id="endTime"
                                            required
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter an end time.</div>
                                        <div className="valid-feedback">Valid end time</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="totalSeats" className="form-label">Total Seats</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="totalSeats"
                                            required
                                            value={totalSeats}
                                            onChange={(e) => setTotalSeats(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter total seats.</div>
                                        <div className="valid-feedback">Valid total seats</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="ticketPrice" className="form-label">Ticket Price</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="ticketPrice"
                                            required
                                            value={ticketPrice}
                                            onChange={(e) => setTicketPrice(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter ticket price.</div>
                                        <div className="valid-feedback">Valid ticket price</div>
                                    </div>
                                    <div className="row m-3 d-flex justify-content-center" id="register-btn">
                                        <button type="submit" className="btn btn-dark w-50 fs-5">
                                            {isLoading ? <Spinner animation="border" size="sm" /> : "Add Showtime"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastNotification classBackground={toastConfig.classBackground} message={toastConfig.message} show={toastConfig.show} onClose={closeToast} />
        </div>
    )
}

export default AddShowtimeComponent;