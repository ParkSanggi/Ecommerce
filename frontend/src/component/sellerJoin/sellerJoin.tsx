import React from 'react';
import './css/sellerJoin.css'

export default class SellerJoin extends React.Component<{},{}> {
    render() {
      return (
          <div className="sellerJoin">
                <div className="joinText">
                    저희와 함께<br/>비즈니스를 시작하세요!
                </div>
              <form className="joinForm" action="">
                <input type="text" name="sellerId" placeholder="  아이디"/>
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