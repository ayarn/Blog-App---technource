import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from "../slices/authSlice"

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const Home = () => {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [blogData, setBlogData] = useState({});
    const [allBlogs, setAllBlogs] = useState([]);

    const handleClose = () => {
        setShow(false);
        setBlogData({
            title: "",
            content: ""
        });
    };
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getCurrUser = async () => {
        try {
            const res = await axios.get(`${BACKEND_API}/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = res.data;
            setUser(data.user);
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                window.alert(error.response.data.message);
                navigate("/");
            }
            console.log(error);
        }
    }

    const getBlogs = async () => {
        try {
            const res = await axios.get(`${BACKEND_API}/posts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = res.data;
            setAllBlogs(data.blogs);
        } catch (error) {
            if (error.response.status === 401 || error.response.status === 400) {
                window.alert(error.response.data.message);
                navigate("/");
            }
            console.log(error);
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        setBlogData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (blogData._id) {
            // edit
            const blogId = blogData._id;

            try {
                const res = await axios.post(`${BACKEND_API}/posts/${blogId}`, blogData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
    
                const data = res.data;
    
                if (res.status === 200) {
                    setBlogData({});
                    handleClose();
                    getBlogs();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            // add
            try {
                const res = await axios.post(`${BACKEND_API}/posts`, blogData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
    
                const data = res.data;
    
                if (res.status === 200) {
                    setBlogData({});
                    handleClose();
                    getBlogs();
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleEdit = async (blog) => {
        handleShow();

        setBlogData(blog);
    }

    const handleDelete = async (id) => {
        const res = await axios.delete(`${BACKEND_API}/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const data = res.data;

        if (res.status === 200) {
            getBlogs();
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
    }

    useEffect(() => {
        getCurrUser();
        getBlogs();
    }, []);

    return (
        <div className='form-box' style={{ marginTop: "10%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div className='' style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "700px"
            }}>
                <h2 className='mb-5'>Blogs by {user.name}</h2>
                <button type="button" class="btn btn-warning" style={{ height: "40px", right: "10px"}} onClick={handleLogout}>Logout</button>
            </div>
            

            <Button variant="primary" onClick={handleShow} style={{ marginBottom: "20px" }}>
                + Add
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="My new blog..."
                                autoFocus
                                name='title'
                                value={blogData.title}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea"
                                rows={5}
                                name='content'
                                value={blogData.content}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type='submit' >
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className="row" style={{ marginBottom: "20px" }}>
                {
                    (allBlogs && allBlogs.length > 0) ? (
                        allBlogs.map((blog) => (
                            <div className="col mb-4">
                                <div className="card" style={{ width: "18rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        <p className="card-text">{blog.content}</p>
                                        <Button variant="success" onClick={() => handleEdit(blog)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" style={{marginLeft: "10px"}} onClick={() => handleDelete(blog._id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                        :
                        (
                            <p>You have not posted any blog yet !!</p>
                        )
                }
            </div>
        </div>
    )
}

export default Home