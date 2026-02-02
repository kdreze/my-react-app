import './LoginPanel.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPanel() {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, register } = useAuth();
    
    // Sign In State
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    
    // Sign Up State
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpPasswordRepeat, setSignUpPasswordRepeat] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!signInEmail || !signInPassword) {
            setError('Please fill in all fields');
            return;
        }
        
        const result = await login(signInEmail, signInPassword);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Login failed');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!signUpName || !signUpEmail || !signUpPassword || !signUpPasswordRepeat) {
            setError('Please fill in all fields');
            return;
        }
        
        if (signUpPassword !== signUpPasswordRepeat) {
            setError('Passwords do not match');
            return;
        }
        
        if (signUpPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        
        const result = await register(signUpName, signUpEmail, signUpPassword);
        
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error || 'Registration failed');
        }
    };

    return (
        <main className="login-panel">
            <div className={`login-panel-container ${isRightPanelActive ? "right-panel-active" : ""}`}>
                <Link to="/">
                    <button className="close-button">x</button>
                </Link>
                
                {error && (
                    <div style={{
                        position: 'absolute',
                        top: '80px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#ffebee',
                        color: '#c62828',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        zIndex: 1000,
                        border: '1px solid #ef5350'
                    }}>
                        {error}
                    </div>
                )}
                
                <div className="sign-in-container">
                    <div className="sign-in-form-wrapper">
                        <form onSubmit={handleSignIn}>
                            <h1 className="form-title-left">Sign in to Sympthosium</h1>
                            <div className="input-group-left">
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    value={signInEmail}
                                    onChange={(e) => setSignInEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group-left">
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    value={signInPassword}
                                    onChange={(e) => setSignInPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="primary-button-left">SIGN IN</button>
                        </form>
                    </div>
                </div>
                
                <div className="sign-up-container">
                    <div className="sign-up-form-wrapper">
                        <form onSubmit={handleSignUp}>
                            <h1 className="form-title-right">Create an account</h1>
                            <div className="input-group-right">
                                <input 
                                    type="text" 
                                    placeholder="Name"
                                    value={signUpName}
                                    onChange={(e) => setSignUpName(e.target.value)}
                                />    
                            </div>
                            <div className="input-group-right">
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    value={signUpEmail}
                                    onChange={(e) => setSignUpEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group-right">
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    value={signUpPassword}
                                    onChange={(e) => setSignUpPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group-right">
                                <input 
                                    type="password" 
                                    placeholder="Repeat password"
                                    value={signUpPasswordRepeat}
                                    onChange={(e) => setSignUpPasswordRepeat(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="primary-button-right">SIGN UP</button>
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
                            <button 
                                className="secondary-button-left" 
                                onClick={() => {
                                    setIsRightPanelActive(false);
                                    setError('');
                                }}
                            >
                                SIGN IN
                            </button>
                        </div>
                        <div className="overlay-panel-right overlay-right">
                            <p className="overlay-small-text-right">New to Sympthosium?</p>
                            <h1>Register now!</h1>
                            <p className="overlay-description-right">
                                Join Sympthosium. Help improve our medical database and shape a smarter, more collaborative health platform.
                            </p>
                            <button 
                                className="secondary-button-right" 
                                onClick={() => {
                                    setIsRightPanelActive(true);
                                    setError('');
                                }}
                            >
                                SIGN UP
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
