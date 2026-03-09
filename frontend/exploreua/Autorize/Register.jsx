import React, { useState } from "react";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";
import { accountService } from "../services/account.service";
import axios from "axios";

const Register = () => {
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

        axios.post(`${import.meta.env.VITE_API_URL}/api/Account/register`, user).then(res => {
            if (res.status === 200) {
                axios.post(`${import.meta.env.VITE_API_URL}/api/Account/login`, user).then(res => {
                    if (res.status === 200) {
                        accountService.login(res.data.accesessToken, res.data.refreshToken, res.data.role);

                        navigate("/");

                    }
                }).catch(err => {
                    console.log("Login error", err);
                })

            }
        }).catch(err => {
            if (err.response && err.response.data) {
                console.log("Деталі помилки від сервера:", err.response.data);
                alert(JSON.stringify(err.response.data));
            } else {
                console.log("Error", err.message);
            }
        });


    };
    return (
        <div className="Parent-div">
            <div className="Main-div">
                <div className="Image-div"></div>
                <div className="Form-div">
                    <div className="form-container">
                        <div className="fontdiv">
                            <h2>Почніть зараз</h2>
                            <div className='FontSecond'><p>Будь ласка, створіть обліковий запис, щоб продовжити.</p></div>
                        </div>
                        <label className='Label-class1'>
                            <span>Пошта</span>
                            <input value={EmailValue} onChange={(e) => setEmailValue(e.target.value)} type='text' placeholder='yourmail@mail.com'></input>
                        </label>

                        <label className='Label-class1'>
                            <span>Пароль</span>

                            <input value={PassValue}
                                onChange={(e) => setPassValue(e.target.value)} type='password' placeholder='••••••••••••'></input>
                        </label>

                        <button onClick={() => onFinish()} className='LoginBtn-class1'>Зареєструватися</button>

                        <div className='Regist-class'>
                            <p>Немає акаунта? <Link className='Link-class' to="/Login"><span>Увійти</span></Link></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Register;