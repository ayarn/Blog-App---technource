import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from "../slices/authSlice";
import axios from 'axios';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            const res = await axios.post(`${BACKEND_API}/login`, userData);
            const data = res.data;

            if (res.status === 200) {
                localStorage.setItem("token", data.token);
                dispatch(login())
                window.alert(data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='form-box' style={{ marginTop: "10%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <h2>Login</h2>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={userData.email} onChange={handleInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={userData.password} onChange={handleInput} className="form-control" id="exampleInputPassword1" />
                </div>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login