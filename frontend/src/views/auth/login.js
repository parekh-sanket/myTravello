import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/auth";
import "../../css/auth.css";

// const baseURL = "https://mytravelloo-backend.herokuapp.com/api/v1/";
const baseURL = "http://127.0.0.1:8000/api/";

const initialState = {
    email: "",
    password: "",
    // isAgent: false,
    error: null,
    loading: false,
};

const Login = () => {
    const { state, dispatch } = useAuthContext();
    const [data, setData] = useState(initialState);

    const handleInputChange = (event) => {
        setData({
            ...data,
            error: null,
            [event.target.name]: event.target.value,
        });
    };

    const loginHandler = (e) => {
        e.preventDefault();

        if (data.email === "" || data.password === "") {
            setData({
                ...data,
                error: "Field is empty !",
            });
            return;
        }

        setData({
            ...data,
            loading: true,
            error: null,
        });

        axios
            .post(baseURL + "login/", {
                email: data.email,
                password: data.password,
                // isAgent: data.isAgent,
            })
            .then((res) => {
                setData({
                    ...data,
                    loading: false,
                    error: null,
                });
                dispatch({
                    type: "LOGIN",
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
                            <span> Login</span>
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
                                        <span className="details">Password</span>
                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            placeholder="Enter your Password"
                                            required
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {/* <input
                                        type="checkbox"
                                        name="isagent"
                                        className="checkbox"
                                        value="xyz"
                                        onChange={(e) =>
                                            setData({ ...data, isAgent: e.target.checked })
                                        }
                                    />
                                    <span className="checkbox">Is Agent ?</span> */}
                                </div>
                                <div className="input-box">
                                    <button
                                        type="button"
                                        className="btn input-btn"
                                        value="Check Out"
                                        onClick={loginHandler}>
                                        {data.loading ? "Logging in..." : "Log In"}
                                    </button>
                                </div>
                                <div className="singup-login">
                                    <p>Not have account?</p>
                                    <Link to="/signup">
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

export default Login;
