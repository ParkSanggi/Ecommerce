import React from "react";
import "./css/mainHeader.css"

class MainHeader extends React.Component<{}, {}> {
    render() {
        return (
            <div className="main-header">
                <span className="material-icons header-menu">menu</span>
                <h2 className="header-title">로고 + 문구</h2>
                <span className="material-icons header-search">search</span>
            </div>
        );
    }
}

export default MainHeader;