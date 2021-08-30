import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./css/loginBar.css";

class LoginBar extends React.Component<{},{}> {
    render() {
        return (
            <div className="login-bar">
                <Link to="/seller/join" className="lb-item">입점신청</Link>
                <Link to="/login" className="lb-item">로그인</Link>
                <Link to="#" className="lb-item">회원가입</Link>
            </div>
        );
    }
}

export default LoginBar;