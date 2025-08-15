import  { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import config from '../config';

import { ToastContainer } from 'react-toastify';

const Home = () => {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }
     const fetchProducts = async () => {
        try {
            const auth = localStorage.getItem('auth');
            if (!auth) {
                // 🔹 Added check for missing token
                handleError("You are not logged in.");
                return;
            }

            const url = `${config.apiBaseUrl}/product/`;
            const response = await fetch(url, {
                // 🔹 Fixed fetch usage — added method and proper headers
                method: 'GET',
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/json'
                }
            });

            let result;
            try {
                result = await response.json();
            } catch {
                // 🔹 Prevent crash if response is not JSON
                return handleError("Invalid server response.");
            }

            console.log(result);

            // 🔹 Ensure products is an array before setting state
            if (Array.isArray(result)) {
                setProducts(result);
            } else if (Array.isArray(result?.result)) {
        // 🔹 NEW: also accept { data: [...] } if you switch later
        setProducts(result.result);
      } 
            else {
                handleError(result?.message || "Failed to load products.");
            }

        } catch (err) {
            handleError(err.message || err);
        }
    };
       

    
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className="container2">
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
                <div>
                     {Array.isArray(products) && products.map((item, index) => (
                       
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Home
