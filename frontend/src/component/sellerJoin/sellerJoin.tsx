import axios, {AxiosInstance} from 'axios';
import React from 'react';
import './css/sellerJoin.css'

export default class SellerJoin extends React.Component<{},{}> {

    private readonly axiosInstance:AxiosInstance;

    constructor(props: {}) {
        super(props);
        
        this.axiosInstance = axios.create(
            {
                baseURL:'http://localhost:8080/'
            }
        )
        this.join = this.join.bind(this);
    }

    join(e:React.FormEvent<HTMLFormElement>):void {
        e.preventDefault();
        this.clearErrorMessageIn(e.currentTarget);
        if (!this.validateForm(e)) {
            console.log("no join");
        }
    }

    private clearErrorMessageIn(form: EventTarget & Element):void {
        let messages = form.getElementsByClassName("errorMessage");

        for (let message of Array.from(messages)) {
            message.remove();
        }
    }

    private validateForm(e:React.FormEvent<HTMLFormElement>):boolean {
        let form = e.currentTarget;
        // 폼이 모두 채워졌는지 체크
        // 아이디 중복체크
        if (!this.isFull(form)
            || this.isDuplicated(form.loginId)) {
            return false;
        }
        // 비밀번호와 비밀번호 확인 체크
        console.log("valid");
        return true;
    }

    private isDuplicated(loginId: HTMLInputElement):boolean {
        const axios = require('axios').default;
        let result = true;
        
        console.log("start req");
        this.axiosInstance.get(`seller/join?loginId=${loginId.value}`)
            .then((response)=>{
                console.log("response");
                console.log(response.data);
                if (!response.data.isDuplicated) {
                    loginId.after(
                        ErrorMessage.create("이미 존재하는 아이디 입니다"))
                } else {
                    result = false;
                }
                console.log("end is duplicated");
            })
        return result;
    }

    private isFull(form: HTMLFormElement):boolean {
        let inputs = form.getElementsByTagName("input");
        let ret = true;

        for (let input of Array.from(inputs)) {
            if (!input.value) {
                input.after(ErrorMessage.create("필수 항목입니다"));
                ret = false;
            }
        }
        return ret;
    }

    render() {
      return (
          <div className="sellerJoin">
                <div className="joinText">
                    저희와 함께<br/>비즈니스를 시작하세요!
                </div>
              <form onSubmit={this.join} className="joinForm" action="">
                <input type="text" name="loginId" placeholder="  아이디"/>
                <input type="password" name="password" placeholder="  비밀번호"/>
                <input type="password" placeholder="  비밀번호 확인"/>
                <input type="text" placeholder="  이메일" />
                <input type="text" placeholder="  핸드폰 번호 ('-'제외)"/>
                <button type="submit">가입하기</button>
              </form>
          </div>
      )
    }
  }


  class ErrorMessage {
      static create(message:string) {
        let errorMessage = document.createElement('div');

        errorMessage.innerText = message;
        errorMessage.className = "errorMessage"
        return errorMessage;
      }
  }