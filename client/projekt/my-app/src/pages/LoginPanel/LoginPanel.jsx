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
                    <form>
                        <h1 className="form-title">Sign in to Sympthosium</h1>
                        <div className="input-group">
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Password" />
                        </div>
                        <button className="primary-button">SIGN IN</button>
                    </form>
                </div>
                <div className="sign-up-container">
                    <form>
                        <h1 className="form-title">Create an account</h1>
                        <div className="input-group">
                            <input type="text" placeholder="Name" />    
                        </div>
                        <div className="input-group">
                            <input type="email" placeholder="Email" />
                        </div>
                        <div className="input-group">
                            <input type="password" placeholder="Password" />
                        </div>
                        <div>
                            <input type="password" placeholder="Repeat Password" />
                        </div>
                        <button className="primary-button">SIGN UP</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <p className="overlay-small-text">Already have an account?</p>
                            <h1>Welcome back!</h1>
                            <p className="overlay-description">
                                Access your tools, manage your contributions, and stay connected to the Sympthosium platform.
                            </p>
                            <button className="secondary-button" onClick={() => setIsRightPanelActive(true)}>
                                SIGN IN
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <p className="overlay-small-text">New to Sympthosium?</p>
                            <h1>Register now!</h1>
                            <p className="overlay-description">
                                Join Sympthosium. Help improve our medical database and shape a smarter, more collaborative health platform.
                            </p>
                            <button className="secondary-button" onClick={() => setIsRightPanelActive(false)}>
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </main>
  )
}