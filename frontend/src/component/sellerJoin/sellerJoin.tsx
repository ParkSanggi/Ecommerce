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
        if (!this.validateForm(e)) {
            console.log("no join");
        }
    }

    private validateForm(e:React.FormEvent<HTMLFormElement>):boolean {
        
        // 폼이 모두 채워졌는지 체크
        // 아이디 중복체크
        if (!this.isFull(e.currentTarget)
            || this.isDuplicated(e.currentTarget.loginId.value)) {
            return false;
        }
        // 비밀번호와 비밀번호 확인 체크
        return true;
    }

    private isDuplicated(loginId:String):boolean {
        const axios = require('axios').default;

        this.axiosInstance.get(`seller/join?loginId=${loginId}`).then((response)=>{
            console.log(response.data);
        })
        return false;
    }

    private isFull(form: EventTarget & Element):boolean {
        let inputs :HTMLCollectionOf<HTMLInputElement>;
        
        inputs = form.getElementsByTagName("input");
        for (let input of Array.from(inputs)) {
            if (!input.value) {
                input.className="hasError";
                return false;
            }
            input.className="";
        }
        return true;
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