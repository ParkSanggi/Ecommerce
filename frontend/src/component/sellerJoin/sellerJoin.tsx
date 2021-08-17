import axios, {AxiosInstance} from 'axios';
import React, { RefObject } from 'react';
import './css/sellerJoin.css'

export default class SellerJoin extends React.Component<{},{}> {
    private readonly axiosInstance:AxiosInstance;
    private firstPassword:RefObject<HTMLInputElement> = React.createRef();
    private validLoginId = false;
    private matchedPassword = false;

    constructor(props: {}) {
        super(props);
        this.axiosInstance = axios.create(
            {
                baseURL:'http://localhost:8080/'
            }
        )
        this.join = this.join.bind(this);
        this.checkLoginIdDuplication = this.checkLoginIdDuplication.bind(this);
        this.checkFirstPassword = this.checkFirstPassword.bind(this);
        this.checkSecondPassword = this.checkSecondPassword.bind(this);
    }

    render() {
        return (
            <div className="sellerJoin">
                <div className="joinText">
                    저희와 함께<br/>비즈니스를 시작하세요!
                </div>
                <form onSubmit={this.join} className="joinForm" action="">
                    <div>
                        <input onBlur={this.checkLoginIdDuplication} type="text" name="loginId" placeholder="  아이디"/>
                    </div>
                    <div>
                        <input onBlur={this.checkFirstPassword} ref={this.firstPassword} type="password" name="password" placeholder="  비밀번호"/>
                    </div>
                    <div>
                        <input onBlur={this.checkSecondPassword} type="password" placeholder="  비밀번호 확인"/>
                    </div>
                    <input type="text" placeholder="  이메일" />
                    <input type="text" placeholder="  핸드폰 번호 ('-'제외)"/>
                    <button type="submit">가입하기</button>
                </form>
            </div>
        )
    }

    join(e:React.FormEvent<HTMLFormElement>):void {
        let form:HTMLFormElement = e.currentTarget;
        
        e.preventDefault();
        if (!this.validLoginId) {
            form.loginId.style.border = '2px solid red';
            return ;
        }
        if (!this.matchedPassword) {
            form.loginId.style.border = '2px solid red';
            return ;
        }
    }

    checkLoginIdDuplication(e:React.FocusEvent<HTMLInputElement>):void {
        let loginId:HTMLInputElement = e.currentTarget;

        this.cleanMessages(loginId);
        if (!loginId.value) {
            loginId.after(ErrorMessage.mustFillData());
            this.validLoginId = false;
            return ;
        }
        this.axiosInstance.get(`seller/join?loginId=${loginId.value}`)
            .then((response)=>{
                if (response.data.duplicated) {
                    loginId.after(ErrorMessage.idAlreadyExist());
                    this.validLoginId = false;
                } else {
                    loginId.after(CompletionMessage.loginIdIsUsable());
                    this.validLoginId = true;
                }
            })
    }

    checkFirstPassword(e:React.FocusEvent<HTMLInputElement>) {
        let firstPassword: HTMLInputElement = e.currentTarget;

        this.cleanMessages(firstPassword);
        if (!firstPassword.value) {
            firstPassword.after(ErrorMessage.mustFillData());
        }
    }

    checkSecondPassword(e:React.FocusEvent<HTMLInputElement>):void {
        let secondPassword:HTMLInputElement = e.currentTarget;

        this.cleanMessages(secondPassword);
        if (!secondPassword.value) {
            secondPassword.after(ErrorMessage.mustFillData());
            this.matchedPassword = false;
            return ;
        }
        if (this.firstPassword.current?.value != secondPassword.value) {
            secondPassword.after(ErrorMessage.passwordDoNotMatch());
            this.matchedPassword = false;
        } else {
            secondPassword.after(CompletionMessage.passwordsAreMatch());
            this.matchedPassword = true;
        }
    }

    private cleanMessages(target:HTMLElement) {
        let errorMessages:HTMLCollectionOf<Element> = 
            target.parentElement!.getElementsByClassName("errorMessage");
        let completionMessages:HTMLCollectionOf<Element> = 
            target.parentElement!.getElementsByClassName("completionMessage");

        for (let message of Array.from(errorMessages)) {
            message.remove();
        }
        for (let message of Array.from(completionMessages)) {
            message.remove();
        }
    }
}

class CompletionMessage {
    static loginIdIsUsable() {
        let message = "사용 가능한 아이디 입니다";
        return this.create(message);
    }

    static passwordsAreMatch() {
        let message = "비밀번호가 일치합니다";
        return this.create(message);
    }

    private static create(message:string) {
        let errorMessage = document.createElement('div');

        errorMessage.innerText = message;
        errorMessage.className = "completionMessage";
        return errorMessage;
    }
}

class ErrorMessage {
    static mustFillData() {
        let message = "필수 항목입니다"
        return ErrorMessage.create(message);
    }

    static idAlreadyExist() {
        let message = "이미 존재하는 아이디입니다"
        return ErrorMessage.create(message);
    }

    static passwordDoNotMatch() {
        let message = "비밀번호가 일치하지 않습니다";
        return ErrorMessage.create(message);
    }

    private static create(message:string) {
        let errorMessage = document.createElement('div');

        errorMessage.innerText = message;
        errorMessage.className = "errorMessage"
        return errorMessage;
    }
}