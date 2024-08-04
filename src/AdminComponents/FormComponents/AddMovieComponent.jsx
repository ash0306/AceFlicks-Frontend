import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import useFormValidation from '../../utilities/useFormValidation';
import NavBarComponent from '../../Components/HeaderComponents/NavBarComponent';
import axiosInstance from '../../utilities/axiosConfig';
import ToastNotification from '../../Components/NotificationComponents/ToastNotification';
import addMovie from '../../assets/images/addMovie.png'
import newMovie from '../../assets/images/newMovie.jpg'

function AddMovieComponent() {
    useFormValidation();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toastConfig, setToastConfig] = useState({
        show: false,
        classBackground: '',
        message: '',
    });
    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

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

    var imageUploaded = "";
    const myWidget = cloudinary.createUploadWidget(
        {
            cloudName: "Bean-Brew",
            uploadPreset: "gymtih7r",
            sources: ["local", "url"], // restrict the upload sources to URL and local files
            multiple: false, //restrict upload to a single file
            tags: ["users", "product"], //add the given tags to the uploaded files
            clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "avif", "webp"], //restrict uploading to image files only
            maxImageFileSize: 2000000, //restrict file size to less than 2MB
            maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
            document
                .getElementById("uploadedimage")
                .setAttribute("src", result.info.secure_url);
            imageUploaded = result.info.secure_url;
            setImageUrl(result.info.secure_url)
            setIsImageUploaded(true);
            }
        }
    );

    const handleImageUpload = (event) => {
        myWidget.open();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || new Date(startTime) >= new Date(endTime)) {
            newToast("bg-danger", "Invalid form data or start time must be before end time! Please check your data and try again");
            event.preventDefault();
            event.stopPropagation();
        } else {
            setIsLoading(true);
            await axiosInstance.post('/movies',{
                title: title,
                synopsis: synopsis,
                genre: genre,
                language: language,
                duration: duration,
                startDate: startDate,
                endDate: endDate,
                imageUrl: imageUrl,
                status: status
            },{
                withCredentials: true,
            })
            .then(response => {
                newToast("bg-success", "Movie added successfully!");
            })
            .catch(error => {
                console.error('Error adding movie:', error);
                newToast("bg-danger", "Error adding movie!");
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
        setTitle('');
        setSynopsis('');
        setGenre('');
        setLanguage('');
        setDuration('');
        setStartDate('');
        setEndDate('');
        setImageUrl('');
        setValidated(true);
    };

    return (
        <div className='main-container'>
            <NavBarComponent/>
            <div className="container p-3 text-dark">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 container border rounded shadow-lg" id="card-form">
                        <div className="row d-flex">
                            <div className="py-5 col-md-6 col-12">
                                <div>
                                    <h1 className="text-center">ADD <span className='color-font'>MOVIE</span></h1>
                                </div>
                                <form className="container needs-validation" noValidate validated={validated.toString()} onSubmit={handleSubmit}>
                                    <div className="row m-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input 
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            placeholder="Enter title"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a title.</div>
                                        <div className="valid-feedback">Valid title</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="synopsis" className="form-label">Synopsis</label>
                                        <textarea
                                            className="form-control"
                                            id="synopsis"
                                            placeholder="Enter synopsis"
                                            required
                                            value={synopsis}
                                            onChange={(e) => setSynopsis(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a synopsis.</div>
                                        <div className="valid-feedback">Valid synopsis</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="genre" className="form-label">Genre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="genre"
                                            placeholder="Enter genre"
                                            required
                                            value={genre}
                                            onChange={(e) => setGenre(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a genre.</div>
                                        <div className="valid-feedback">Valid genre</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="language" className="form-label">Language</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="language"
                                            placeholder="Enter language"
                                            required
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a language.</div>
                                        <div className="valid-feedback">Valid language</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="duration" className="form-label">Duration (in minutes)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="duration"
                                            placeholder="Enter duration"
                                            required
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a valid duration.</div>
                                        <div className="valid-feedback">Valid duration</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="startDate" className="form-label">Start Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="startDate"
                                            required
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter a start date.</div>
                                        <div className="valid-feedback">Valid start date</div>
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="endDate" className="form-label">End Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="endDate"
                                            required
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                        <div className="invalid-feedback">Please enter an end date.</div>
                                        <div className="valid-feedback">Valid end date</div>
                                    </div>
                                    <div className="row m-3">
                                        <div>
                                        <label>Upload Picture:</label>
                                        <button className='ms-2 btn color-bg' id="upload_widget" onClick={handleImageUpload}>
                                            Upload file
                                        </button>
                                        </div>
                                        {isImageUploaded && (
                                            <div>
                                                <img id="uploadedimage" src={imageUrl} style={{height:'50px', width:'50px'}} alt="Uploaded" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="row m-3">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            className="form-control"
                                            id="status"
                                            required
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">Select status</option>
                                            <option value="Running">Running</option>
                                            <option value="NotRunning">NotRunning</option>
                                        </select>
                                        <div className="invalid-feedback">Please select a status.</div>
                                        <div className="valid-feedback">Valid status</div>
                                    </div>
                                    <div className="row m-3 d-flex justify-content-center" id="register-btn">
                                        <button type="submit" className="btn btn-dark w-50 fs-5">
                                            {isLoading ? <Spinner animation="border" size="sm" /> : "Add Movie"}
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

export default AddMovieComponent;