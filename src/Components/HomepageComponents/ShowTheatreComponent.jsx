import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utilities/axiosConfig';

const ShowTheatreComponent = () => {
    const [theatres, setTheatres] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {    
        const fetchData = async () => {
            await axiosInstance.get('/theatres')
            .then(response => {
                setTheatres(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching theatres:', error);
                setLoading(false);
            });
        }
        fetchData();
    }, []);
    
    const handleTheatreSelection = (name) =>{
        navigate('/showtimes', {state:{theatreName: name}});
    }

    if (loading) {
        return <div className="text-center mt-5 home-container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }
  return (
    <div className='home-container'>
        <div className="container mt-5">
            <h2 className="text-start mb-4">Theatres</h2>
            <div className="d-flex overflow-auto theatre-section" style={{ whiteSpace: 'nowrap' }}>
                {theatres.map((theatre, index) => (
                    <div key={index} className="mx-3 border border-white" style={{ display: 'inline-block', minWidth: '200px' }}>
                        <div className="text-center mt-2" onClick={() => {handleTheatreSelection(theatre.name)}}>
                            <h5>{theatre.name}</h5>
                            <p>{theatre.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ShowTheatreComponent