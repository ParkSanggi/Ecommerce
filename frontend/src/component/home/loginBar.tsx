import React from "react";
import "./css/loginBar.css"

class LoginBar extends React.Component<{},{}> {
    render() {
        return (
            <div className="login-bar">
                <a className="lb-item" href="#">입점신청</a>
                <a className="lb-item" href="#">로그인</a>
                <a className="lb-item" href="#">회원가입</a>
            </div>
        );
    }
}

export default LoginBar;