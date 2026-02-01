import './LoginPanel.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPanel() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
     return (
        <main className="login-panel">
            <div className={`login-panel-container ${isRightPanelActive ? "right-panel-active" : ""}`}>
                <Link to="/">
                    <button className="close-button">x</button>
                </Link>
                <div className="sign-in-container">
                    <div className="sign-in-form-wrapper">
                        <form>
                            <h1 className="form-title-left">Sign in to Sympthosium</h1>
                            <div className="input-group-left">
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="input-group-left">
                                <input type="password" placeholder="Password" />
                            </div>
                            <button className="primary-button-left">SIGN IN</button>
                        </form>
                    </div>
                </div>
                <div className="sign-up-container">
                    <div className="sign-up-form-wrapper">
                        <form>
                            <h1 className="form-title-right">Create an account</h1>
                            <div className="input-group-right">
                                <input type="text" placeholder="Name" />    
                            </div>
                            <div className="input-group-right">
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="input-group-right">
                                <input type="password" placeholder="Password" />
                            </div>
                            <div className="input-group-right">
                                <input type="password" placeholder="Repeat password" />
                            </div>
                            <button className="primary-button-right">SIGN UP</button>
                        </form>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel-left overlay-left">
                            <p className="overlay-small-text-left">Already have an account?</p>
                            <h1>Welcome back!</h1>
                            <p className="overlay-description-left">
                                Access your tools, manage your contributions, and stay connected to the Sympthosium platform.
                            </p>
                            <button className="secondary-button-left" onClick={() => setIsRightPanelActive(false)}>
                                SIGN IN
                            </button>
                        </div>
                        <div className="overlay-panel-right overlay-right">
                            <p className="overlay-small-text-right">New to Sympthosium?</p>
                            <h1>Register now!</h1>
                            <p className="overlay-description-right">
                                Join Sympthosium. Help improve our medical database and shape a smarter, more collaborative health platform.
                            </p>
                            <button className="secondary-button-right" onClick={() => setIsRightPanelActive(true)}>
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
  )
}