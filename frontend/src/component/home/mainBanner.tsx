import React from "react";
import "./css/mainBanner.css"


class MainBanner extends React.Component<{},{}> {
    render() {
        return (
            <div className="banner">
                <a href="#">
                    <img className="banner-img"
                     src="https://ecommerce-s3-images.s3.ap-northeast-2.amazonaws.com/top_banner.png"></img>
                </a>
            </div>
        );
    }
}

export default MainBanner;