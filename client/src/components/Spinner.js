import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount]= useState(5);       //TO SHOW SPINNER FOR 5 SECONDS
    const navigate= useNavigate();
    const location= useLocation();

    useEffect(() =>{
        const interval= setInterval(() =>{
            setCount((prevValue) => --prevValue);       //DECREMENTING PREVIOUS VALUE
        },1000);                                //THIS IS SHOWING WE HAVE INTERVAL OF 1
        count===0 && navigate('/login', {
            state: location.pathname });        //NAVIGATING TO LOGIN WHEN COUNT BECOMES 0 
        return() => clearInterval(interval)     //TERMINATION 
    }, [count, navigate, location ]);
  return (
    <>
    <div className="d-flex flex-column justify-content-center align-items-center" style={{height: "100vh"}}>
        <h1 className='Text-center'>redirecting to you in {count} second</h1>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    </>
  );
};

export default Spinner;