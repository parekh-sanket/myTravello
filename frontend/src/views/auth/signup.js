import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import "../../css/auth.css";

// const baseURL = "https://mytravelloo-backend.herokuapp.com/api/v1/";
const baseURL = "http://127.0.0.1:8000/api/";

let initialState = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    password1: "",
    password2: "",
    isAgent: false,
    loading: false,
    error: null,
};

const Signup = () => {
    const { state, dispatch } = useAuthContext();
    const [data, setData] = useState(initialState);

    const handleInputChange = (event) => {
        setData({
            ...data,
            error: null,
            [event.target.name]: event.target.value,
        });
    };

    if(data.error !== null){ 
        console.log("hello");
        document.getElementsByTagName("html")[0].scrollTop = 0;
    }

    const signupHandler = (e) => {
        e.preventDefault();

        if (
            data.username === "" ||
            data.first_name === "" ||
            data.email === "" ||
            data.phone_no === "" ||
            data.password1 === "" ||
            data.password2 === ""
        ) {
            setData({
                ...data,
                error: "Field is empty !",
            });
            return;
        }

        if (data.password1 !== data.password2) {
            setData({
                ...data,
                error: "Password Does not match !",
            });
            return;
        }

        setData({
            ...data,
            loading: true,
            error: null,
        });

        axios
            .post(baseURL + "signup/", {
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_no: data.phone_no,
                password: data.password1,
                isAgent: data.isAgent,
            })
            .then((res) => {
                setData({
                    ...data,
                    loading: false,
                    error: null,
                });
                dispatch({
                    type: "SIGNUP",
                    payload: res.data,
                });
            })
            .catch((err) => {
                const errorData = err.response ? err.response.data["msg"] : "Network Error";
                setData({
                    ...data,
                    loading: false,
                    error: errorData,
                });
            });
    };

    return (
        <div className="container">
            <div className="auth">
                {state.isAuth ? (
                    <Redirect to="/" />
                ) : (
                    <>
                        <Link className="btn home-button" to="/">
                            <div className="fas fa-home"></div>
                        </Link>
                        <h1 className="heading">
                            <span>Sign Up</span>
                        </h1>
                        {data.error && (
                            <p className="error" style={{ fontSize: "1.4rem" }}>
                                {data.error}
                            </p>
                        )}
                        <div className="content">
                            <form action="#">
                                <div className="auth-details">
                                    <div className="input-box">
                                        <span className="details">Username</span>
                                        <input
                                            type="text"
                                            name="username"
                                            value={data.username}
                                            placeholder="Enter your Email"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">First Name</span>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={data.first_name}
                                            placeholder="Enter your First Name"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Last Name</span>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            placeholder="Enter your Last Name"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Email</span>
                                        <input
                                            type="text"
                                            name="email"
                                            value={data.email}
                                            placeholder="Enter your Email"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Phone Number</span>
                                        <input
                                            type="text"
                                            name="phone_no"
                                            value={data.phone_no}
                                            placeholder="Enter your Phone Number"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Password</span>
                                        <input
                                            type="password"
                                            name="password1"
                                            value={data.password1}
                                            placeholder="Enter your Password"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Password (Again)</span>
                                        <input
                                            type="password"
                                            name="password2"
                                            value={data.password2}
                                            placeholder="Enter again Password"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="">
                                        <input
                                            type="checkbox"
                                            name="isagent"
                                            className="checkbox"
                                            value="isAgent"
                                            onChange={(e) =>
                                                setData({ ...data, isAgent: e.target.checked })
                                            }
                                        />
                                        <span className="checkbox">Is Agent ?</span>
                                    </div>
                                </div>
                                <div className="input-box">
                                    <button
                                        type="button"
                                        className="btn input-btn"
                                        value="Check Out"
                                        onClick={signupHandler}>
                                        {data.loading ? "Signing in..." : "Sign Up"}
                                    </button>
                                    
                                    {/* <Link to="/login">
                                        <button className="btn" type="button">
                                            Log In
                                        </button>
                                    </Link>
                                    &nbsp; */}
                                </div>
                                <div className="singup-login">
                                    <p>Already have account?</p>
                                    <Link to="/login">
                                        click here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Signup;
