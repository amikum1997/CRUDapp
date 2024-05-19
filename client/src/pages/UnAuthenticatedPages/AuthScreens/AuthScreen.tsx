import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import './auth.scss'
import useHttp from '../../../hooks/useHttp';

const AuthScreen = () => {

    // CUSTOM HOOK USEHTTP
    const { loading, error, data, sendRequest }: { loading: boolean, error: string, data: any, sendRequest: any } = useHttp();


    const [authState, setAuthState] = useState<number>(0)

    // USER AUTH VARIABLES
    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")

    // LABEL ACTIVE ON FOCUS
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [userNameFocused, setUserNameFocused] = useState(false)

    // CREDENCIAL ERROR STATE
    const [errorState, setErrorState] = useState({
        mailError: false,
        passwordError: false,
        usernameError: false
    })

    const isEmailValid = (email: string) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setUserEmail(email)
        if (!emailRegex.test(email)) {
            setErrorState(prevState => ({
                ...prevState,
                mailError: true
            }));
        } else {
            setErrorState(prevState => ({
                ...prevState,
                mailError: false
            }));
        }
    };

    const isPasswordValid = (password: string) => {
        // Regular expression for password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        setUserPassword(password)
        if (!passwordRegex.test(password)) {
            setErrorState(prevState => ({
                ...prevState,
                passwordError: true
            }));
        } else {
            setErrorState(prevState => ({
                ...prevState,
                passwordError: false
            }));
        }
    };


    const loginUserSubmitHandeler = async () => {

        // EMAIL VALIDATION CHECKS
        if (!userEmail) {
            setErrorState(prevState => ({
                ...prevState,
                mailError: true
            }));
        }

        // PASSOWRD VALIDATION CHECKS
        if (!userPassword) {
            setErrorState(prevState => ({
                ...prevState,
                passwordError: true
            }));
        }

        // IF ALL GOOD
        if (!errorState.mailError || !errorState.passwordError) {
            let toSendData = {
                userEmail: userEmail,
                userPassword: userPassword
            }
            await sendRequest('auth/login', 'POST', toSendData)

            console.log(data);
            

            if(data.token){
                localStorage.setItem('token' , data.token)
                localStorage.setItem('user' , JSON.stringify(data))
                window.location.replace('/dashboard')
            }
        }
    }

    const registerUserSubmitHandeler = () => {
        if(userName && userEmail && userPassword){
            
        }
    }


    return (
        <main className={`${authState === 0 ? '' : 'sign-up-mode'}`}>
            <div className="box">
                <div className="inner-box">
                    <div className="forms-wrap ">
                        {
                            authState === 0 &&
                            <Fragment>
                                <div className="form sign-in-form">
                                    <div className="logo">
                                        <img src="./images/AuthScreen/logo.png" alt="easyclass" />
                                        <h4>MoneyManager</h4>
                                    </div>
                                    <div className="heading">
                                        <h2>Welcome Back</h2>
                                        <h6>Not registred yet?</h6>
                                        <a href="#" className="toggle" onClick={() => { setAuthState(1) }}>Sign up</a>
                                    </div>
                                    <div className="actual-form">
                                        <div className="input-wrap">
                                            <input type="email" className={`input-field ${emailFocused && 'active'}`} autoComplete="off" required onChange={(event: ChangeEvent<HTMLInputElement>) => { isEmailValid(event.target.value) }} onFocus={() => { setEmailFocused(true) }} onBlur={() => {!userEmail ?  setEmailFocused(false) :  setEmailFocused(true)}} />
                                            <label>Email</label>
                                        </div>
                                        <div className="input-wrap">
                                            <input type="password" className={`input-field ${passwordFocused && 'active'}`} autoComplete="off" required onChange={(event: ChangeEvent<HTMLInputElement>) => { isPasswordValid(event.target.value) }} onFocus={() => { setPasswordFocused(true) }} onBlur={() => { !userPassword ? setPasswordFocused(false) : setPasswordFocused(true) }} />
                                            <label>Password</label>
                                        </div>
                                        <input type="submit" defaultValue="Sign In" className="sign-btn" onClick={loginUserSubmitHandeler} />
                                        <p className="text">
                                            Forgotten your password or you login datails?
                                            <a href="#">Get help</a> signing in
                                        </p>
                                    </div>
                                </div>
                            </Fragment>
                        }

                        {
                            authState === 1 &&
                            <Fragment>
                                <Fragment>
                                    <form action="index.html" autoComplete="off" className="sign-up-form ">
                                        <div className="logo">
                                            <img src="./images/AuthScreen/logo.png" alt="easyclass" />
                                            <h4>Maoney Manager</h4>
                                        </div>
                                        <div className="heading">
                                            <h2>Get Started</h2>
                                            <h6>Already have an account?</h6>
                                            <a href="#" className="toggle" onClick={() => { setAuthState(0) }}>Sign in</a>
                                        </div>
                                        <div className="actual-form">
                                            <div className="input-wrap">
                                                <input type="text" className="input-field" autoComplete="off" required onChange={(event: ChangeEvent<HTMLInputElement>) => { setUserName(event.target.value) }} />
                                                <label>Name</label>
                                            </div>
                                            <div className="input-wrap">
                                                <input type="email" className={`input-field ${emailFocused && 'active'}`} autoComplete="off" required onChange={(event: ChangeEvent<HTMLInputElement>) => { isEmailValid(event.target.value) }} onFocus={() => { setEmailFocused(true) }} onBlur={() => { setEmailFocused(false) }} />
                                                <label>Email</label>
                                            </div>
                                            <div className="input-wrap">
                                                <input type="password" className={`input-field ${passwordFocused && 'active'}`} autoComplete="off" required onChange={(event: ChangeEvent<HTMLInputElement>) => { isPasswordValid(event.target.value) }} onFocus={() => { setPasswordFocused(true) }} onBlur={() => { setPasswordFocused(false) }} />
                                                <label>Password</label>
                                            </div>
                                            <input type="submit" defaultValue="Sign Up" className="sign-btn" onClick={registerUserSubmitHandeler} />
                                            <p className="text">
                                                By signing up, I agree to the
                                                <a href="#">Terms of Services</a> and
                                                <a href="#">Privacy Policy</a>
                                            </p>
                                        </div>
                                    </form>
                                </Fragment>
                            </Fragment>
                        }

                    </div>
                    <div className="carousel">
                        <div className="images-wrapper">
                            <img src="./images/AuthScreen/image1.png" className="image img-1 show" alt="slide1" />
                            <img src="./images/AuthScreen/image2.png" className="image img-2" alt="slide2" />
                            <img src="./images/AuthScreen/image3.png" className="image img-3" alt="slide3" />
                        </div>
                        <div className="text-slider">
                            <div className="text-wrap">
                                <div className="text-group">
                                    <h2>Create your own courses</h2>
                                    <h2>Customize as you like</h2>
                                    <h2>Invite students to your class</h2>
                                </div>
                            </div>
                            <div className="bullets">
                                <span className="active" data-value={1} />
                                <span data-value={2} />
                                <span data-value={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}

export default AuthScreen