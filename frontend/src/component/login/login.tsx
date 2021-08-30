import React from "react";
import { Link } from "react-router-dom";
import "./css/login.css";

export default class Login extends React.Component<{}, {}> {
    render() {
        return (
            <div className="loginWrapper">
                <div className="login">
                    <div className="logo">
                    </div>
                    <form className="loginForm">
                        <div>
                            <input type="text" name="loginId" placeholder="  아이디"/>
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="  비밀번호"/>
                        </div>
                        <button type="submit" className="loginButton">로그인</button>
                    </form>
                    <Link to="#">
                        <button>회원가입</button>
                    </Link>
                </div>
            </div>
        )
    }
}