import Google from "../img/Google.png";
import Facebook from "../img/Facebook.png";
import { Link } from "react-router-dom";


const Login = () => {
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };
    const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
    };
    return (
        <div className="login">
            <h1 className="loginTitle">Choose Login method</h1>
            <div className="wrapper">
                <div className="left">

                    <div className="loginButton google" onClick={google}>
                        <img src={Google} alt="" className="icon" />
                        Google

                    </div>
                    <div className="loginButton facebook" onClick={facebook}>
                        <img src={Facebook} alt="" className="icon" />
                        Facebook

                    </div>
                </div>
                <div className="center">
                    <div className="line">

                    </div>
                </div>
                <div className="right">We protect your data</div>
                

            </div>
        </div>


    )


};

export default Login;