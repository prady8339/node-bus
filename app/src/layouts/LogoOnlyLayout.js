import React from 'react';
import {Outlet} from "react-router-dom";
import {styled} from "@mui/material";

const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: "3vw",
    backgroundColor: '#ffffff'
});

function LogoOnlyLayout(props) {
    return (
        <RootStyle>
            <Outlet/>
        </RootStyle>
    );
}

export default LogoOnlyLayout;