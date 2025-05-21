import {useDispatch, useSelector} from 'react-redux'
import React,{useState} from "react";
import {login} from "../redux/authSlice.js"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validate = () => {
        const newErrors = {};
        if(!email){
            newErrors.email = "Email is required";
        }
            else if(!/\S+@\S+\.\S+/.test(email)){
                newErrors.email = "Invalid email ";
            }
        if(!password){
            newErrors.password = "Password is required";
        }
            else if(password.length < 6){
                newErrors.password = "Password must be at least 6 characters";
            }
            return newErrors;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length){
            setErrors(validationErrors);
            return;
        }
        dispatch(login({email}));
        navigate("/Home");

    }


    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <small>{errors.email}</small> }
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <small>{errors.password}</small> }
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )

}
export default Login;