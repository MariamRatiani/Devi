import './animatedStyle.scss';
// import React from 'react';

// https://github.com/baunov/gradients-bg/blob/main/src/main.ts
function Homepage() {
    return (
        <>
            <div className="text-container">
                DEVI
            </div>
            <div className="top-right-buttons">
                <button className="login-button">Login</button>
                <button className="signup-button">Sign Up</button>
            </div>
            <div className="gradient-bg">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>
                <div className="gradients-container">
                    <div className="g1"></div>
                    <div className="g2"></div>
                    <div className="g3"></div>
                    <div className="g4"></div>
                    <div className="g5"></div>
                    <div className="interactive"></div>
                </div>
            </div>
            <div className="button-container">
                <button className="start-button">Start</button>
            </div>
        </>
    );
}

export default Homepage;
