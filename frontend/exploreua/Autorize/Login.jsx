import React, { useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../services/account.service";
import axios from "axios";

const Login = () => {
    const [IsLogin, setIsLogin] = useState(true);
    const [EmailValue, setEmailValue] = useState("");
    const [PassValue, setPassValue] = useState("");
    // const { Email, setEmail, API_URL_CON } = useContext(CounterContext);

    const navigate = useNavigate();




    function onFinish() {

        var user = {
            email: EmailValue,
            password: PassValue
        }

        axios.post(`${import.meta.env.VITE_API_URL}/api/Account/login`, user).then(res => {
            if (res.status === 200) {
                accountService.login(res.data.accesessToken, res.data.refreshToken, res.data.role);

                navigate("/");

            }
        }).catch(err => {
            console.log("Login error", err);
        })

    };
    return (
        <div className="Parent-div">
            <div className="Main-div">
                <div className="Image-div"></div>
                <div className="Form-div">
                    <div className="form-container">
                        <div className="fontdiv">
                            <h2>Почніть зараз</h2>
                            <div className='FontSecond'><p>Будь ласка, увійдіть у свій обліковий запис, щоб продовжити.</p></div>
                        </div>


                        <label className='Label-class1'>
                            <span>Пошта</span> {/* Обгорнули текст */}
                            <input value={EmailValue} onChange={(e) => setEmailValue(e.target.value)} type='text' placeholder='yourmail@mail.com'></input>
                        </label>

                        <label className='Label-class1'>
                            <span>Пароль</span> {/* Обгорнули текст */}
                            <div className='forgotPass-class'><p>Забули пароль?</p></div>
                            <input value={PassValue}
                                onChange={(e) => setPassValue(e.target.value)} type='password' placeholder='••••••••••••'></input>
                        </label>

                        <button onClick={() => onFinish()} className='LoginBtn-class1'>Увійти</button>

                        <div className='Regist-class'>
                            <p>Немає акаунта? <Link className='Link-class' to="/Register"><span>Зареєструватися</span></Link></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Login;