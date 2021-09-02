import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../../util/message";
import Cookies, { Cookie } from "universal-cookie/es6";
import "./css/login.css";

export default class Login extends React.Component<{serverURL:String}, {}> {
    
    constructor(props:{serverURL:String}) {
        super(props);
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate(e:React.FormEvent<HTMLFormElement>):void {
        let form:HTMLFormElement = e.currentTarget;

        e.preventDefault();
        if (!this.isFull(form)) {
            this.showErrorMessage(form);
            return ;
        }

        axios.post(this.props.serverURL + "/auth", {
            username: form.username.value,
            password: form.password.value
        })
        .then((response)=> {
            const cookies = new Cookies();
            cookies.set("loginToken", response.data.token, {
                path:'/',
                expires: new Date(1000 * 60 * 24)
            })
            console.log(cookies.get("loginToken"));
        })
        .catch((error)=>{
            if (error.response.status == 400) {
                form.password.after(ErrorMessage.invalidLoginInfo());
                return ;
            }
            alert("로그인에 실패했습니다.\n잠시 후 다시 시도해주세요")
        })
    }

    private isFull(form:HTMLFormElement) {
        if (!form.username.value || !form.password.value) {
            return false;
        }
        return true;
    }

    private showErrorMessage(form:HTMLFormElement) {
        let username:HTMLInputElement = form.username;
        let password:HTMLInputElement = form.password;
        let errorMessages = form.getElementsByClassName("errorMessage");

        for (let message of Array.from(errorMessages)) {
            message.remove();
        }    
        if (!username.value) {
            username.after(ErrorMessage.mustFillData());
        }
        if (!password.value) {
            password.after(ErrorMessage.mustFillData());
        }
    }

    render() {
        return (
            <div className="loginWrapper">
                <div className="login">
                    <div className="logo">
                    </div>
                    <form className="loginForm" onSubmit={this.authenticate}>
                        <div>
                            <input type="text" name="username" placeholder="  아이디"/>
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