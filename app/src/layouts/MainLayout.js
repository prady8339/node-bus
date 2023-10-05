import React from 'react';
import {styled} from "@mui/material";
import {Footer, Header} from "../components";
import {Outlet} from "react-router-dom";

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    paddingTop: "150px",
    paddingLeft: "5vw",
    paddingRight: "5vw",
    backgroundColor: '#ffffff'
});

function MainLayout(props) {
    return (
        <RootStyle>
            <Header/>
            <Outlet/>
            <Footer/>
        </RootStyle>
    );
}

export default MainLayout;