import React from "react";
import '../sass/login.scss';


const Login = () =>{
    return(
        <div className="auth__main">

            <div className="auth__box-container">
            
            <h3 className="auth__tittle">Login</h3>
            <form>
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Login
                </button>
            
            </form>
            

            </div>
            

        </div>
    );
};
export default Login;