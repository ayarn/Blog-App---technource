import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const Register = () => {
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BACKEND_API}/register`, userData);
            const data = res.data;

            if (res.status === 201) {
                window.alert(data.message);
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form-box' style={{ marginTop: "10%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <h2>Register</h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={userData.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" name="name" value={userData.name} onChange={handleInput} className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={userData.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" />
                </div>
                <p>Already have an account? <Link to="/">Login</Link></p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register