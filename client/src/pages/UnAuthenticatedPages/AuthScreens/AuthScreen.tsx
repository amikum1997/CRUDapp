import React, { Fragment, useState } from 'react'
import './auth.scss'

const AuthScreen = () => {

    const [authState, setAuthState] = useState<number>(0)

    return (
        <main className={`${authState === 0 ? '' : 'sign-up-mode'}`}>
            <div className="box">
                <div className="inner-box">
                    <div className="forms-wrap ">
                        {
                            authState === 0 &&
                                <Fragment>
                                    <form action="index.html" autoComplete="off" className="sign-in-form">
                                        <div className="logo">
                                            <img src="./images/AuthScreen/logo.png" alt="easyclass" />
                                            <h4>MoneyManager</h4>
                                        </div>
                                        <div className="heading">
                                            <h2>Welcome Back</h2>
                                            <h6>Not registred yet?</h6>
                                            <a href="#" className="toggle" onClick={()=>{setAuthState(1)}}>Sign up</a>
                                        </div>
                                        <div className="actual-form">
                                            <div className="input-wrap">
                                                <input type="text" minLength={4} className="input-field" autoComplete="off" required />
                                                <label>Name</label>
                                            </div>
                                            <div className="input-wrap">
                                                <input type="password" minLength={4} className="input-field" autoComplete="off" required />
                                                <label>Password</label>
                                            </div>
                                            <input type="submit" defaultValue="Sign In" className="sign-btn" />
                                            <p className="text">
                                                Forgotten your password or you login datails?
                                                <a href="#">Get help</a> signing in
                                            </p>
                                        </div>
                                    </form>
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
                                            <a href="#" className="toggle"  onClick={()=>{setAuthState(0)}}>Sign in</a>
                                        </div>
                                        <div className="actual-form">
                                            <div className="input-wrap">
                                                <input type="text" minLength={4} className="input-field" autoComplete="off" required />
                                                <label>Name</label>
                                            </div>
                                            <div className="input-wrap">
                                                <input type="email" className="input-field" autoComplete="off" required />
                                                <label>Email</label>
                                            </div>
                                            <div className="input-wrap">
                                                <input type="password" minLength={4} className="input-field" autoComplete="off" required />
                                                <label>Password</label>
                                            </div>
                                            <input type="submit" defaultValue="Sign Up" className="sign-btn" />
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