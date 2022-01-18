import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import s from "../classes/main.css";
import l from "./layout.module.css";

const Layout = ({children}) => {
    return (
        <>
        <Header/>
            <div className={l.paddings}>
                {children}
            </div>
        <Footer/>
        </>
    )
}

export default Layout;