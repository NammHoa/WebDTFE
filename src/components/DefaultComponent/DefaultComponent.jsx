import React from "react";
import HeaderComponent from '../HeaderComponent/HeaderComponent'
const DefaultConponent = ({ children }) => {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    )
}
export default DefaultConponent