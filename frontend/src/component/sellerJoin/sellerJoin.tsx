import axios, {AxiosInstance} from 'axios';
import React, { RefObject } from 'react';
import { Redirect } from 'react-router-dom';
import './css/sellerJoin.css'
import { ErrorMessage, CompletionMessage, cleanMessages } from '../../util/message';
export default class SellerJoin extends React.Component<{},{joinSuccess:boolean}> {
    private readonly axiosInstance:AxiosInstance;
    private firstPassword:RefObject<HTMLInputElement> = React.createRef();
    private secondPassword:RefObject<HTMLInputElement> = React.createRef();
    private validLoginId = false;
    private validPassword = false;
    private matchedPassword = false;

    constructor(props: {}) {
        super(props);
        this.state = {
            joinSuccess: false
        }
        this.axiosInstance = axios.create(
            {
                baseURL:'http://localhost/api'
            }
        )
        this.join = this.join.bind(this);
        this.checkLoginIdDuplication = this.checkLoginIdDuplication.bind(this);
        this.checkFirstPassword = this.checkFirstPassword.bind(this);
        this.checkSecondPassword = this.checkSecondPassword.bind(this);
    }

    render() {
        if (this.state.joinSuccess) {
            return <Redirect to="/login" />
        }
        return (
            <div className="sellerJoin">
                <div className="joinText">
                    저희와 함께<br/>비즈니스를 시작하세요!
                </div>
                <form onSubmit={this.join} className="joinForm">
                    <div>
                        <input onBlur={this.checkLoginIdDuplication} type="text" name="loginId" placeholder="  아이디"/>
                    </div>
                    <div>
                        <input onBlur={this.checkFirstPassword} ref={this.firstPassword} type="password" name="firstPassword" placeholder="  비밀번호"/>
                    </div>
                    <div>
                        <input onBlur={this.checkSecondPassword} ref={this.secondPassword} type="password" name="secondPassword" placeholder="  비밀번호 확인"/>
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
        if (this.checkJoinCondition(form)) {
            this.axiosInstance.post("/users", {
                username: form.loginId.value,
                password: form.firstPassword.value
            })
            .then((response)=>{
                alert("가입이 완료되었습니다.")
                this.setState({
                    joinSuccess:true
                })
            })
            .catch(()=>{
                alert("가입 요청에 실패했습니다.\n잠시 후 다시 시도해주세요")
            })
        }
    }

    private checkJoinCondition(form:HTMLFormElement):boolean {
        if (!this.validLoginId) {
            form.loginId.focus();
            return false;
        }
        if (!this.validPassword) {
            form.firstPassword.focus();
            return false;
        }
        if (!this.matchedPassword) {
            form.secondPassword.focus();
            return false;
        }
        return true;
    }

    checkLoginIdDuplication(e:React.FocusEvent<HTMLInputElement>):void {
        let loginId:HTMLInputElement = e.currentTarget;

        cleanMessages(loginId);
        if (!loginId.value) {
            loginId.after(ErrorMessage.mustFillData());
            this.validLoginId = false;
            return ;
        }
        this.axiosInstance.get(`/users/check?username=${loginId.value}`)
            .then((response)=>{
                if (response.data.existence) {
                    loginId.after(ErrorMessage.idAlreadyExist());
                    this.validLoginId = false;
                } else {
                    loginId.after(CompletionMessage.loginIdIsUsable());
                    this.validLoginId = true;
                }
            })
            .catch(()=>{
                alert("아이디 중복 검사에 실패했습니다.\n잠시 후 다시 시도해주세요")
            })
    }

    checkFirstPassword(e:React.FocusEvent<HTMLInputElement>) {
        let firstPassword: HTMLInputElement = e.currentTarget;

        cleanMessages(firstPassword);
        if (!firstPassword.value) {
            firstPassword.after(ErrorMessage.mustFillData());
            this.validPassword = false;
            return ;
        } else if (this.secondPassword.current!.value && 
                    firstPassword.value != this.secondPassword.current!.value) {
                    cleanMessages(this.secondPassword.current!);
                    this.secondPassword.current!.after(ErrorMessage.passwordDoNotMatch());
                    this.matchedPassword = false;
                }
        this.validPassword = true;
    }

    checkSecondPassword(e:React.FocusEvent<HTMLInputElement>):void {
        let secondPassword:HTMLInputElement = e.currentTarget;

        cleanMessages(secondPassword);
        if (!secondPassword.value) {
            secondPassword.after(ErrorMessage.mustFillData());
            this.matchedPassword = false;
            return ;
        }
        if (this.firstPassword.current?.value !== secondPassword.value) {
            secondPassword.after(ErrorMessage.passwordDoNotMatch());
            this.matchedPassword = false;
        } else {
            secondPassword.after(CompletionMessage.passwordsAreMatch());
            this.matchedPassword = true;
        }
    }
}