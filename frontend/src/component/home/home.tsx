import React from "react";
import MainBanner from "./mainBanner";
import LoginBar from "./loginBar";
import MainHeader from "./mainHeader";

class Home extends React.Component<{},{}>{
    render() {
        return (
            <div className="col-center">
                <MainHeader />
                <LoginBar />
                <MainBanner />
            </div>
        );
    }
}

export default Home;