import React, { useContext } from 'react';
import styles from './Login.module.css';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setLogin, setUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = {
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            };

            setUserInfo(userData);
            setLogin(true);

            localStorage.setItem("isLogin", "true");
            localStorage.setItem("userInfo", JSON.stringify(userData));

            navigate('/dashboard');

        } catch (err) {
            console.log(err);
            alert("Login Failed");
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.glowOrb}></div>
            <div className={styles.glowOrb2}></div>

            <div className={styles.loginCard}>
                
                <div className={styles.header}>
                    <div className={styles.badge}>
                        <AutoAwesomeIcon fontSize="small" />
                        AI Resume Analyzer
                    </div>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to analyze resumes using AI-powered insights
                    </p>
                </div>

                <button className={styles.googleBtn} onClick={handleLogin}>
                    <GoogleIcon sx={{ fontSize: 20 }} />
                    Continue with Google
                </button>

                <div className={styles.footerText}>
                    Secure login powered by Firebase Authentication
                </div>

            </div>
        </div>
    );
};

export default Login;