import React from 'react';
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import {Chat, Home, Login, Post, Register} from "./pages";
import {LogoOnlyLayout, MainLayout} from "./layouts";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LogoOnlyLayout />}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="/" element={<Navigate to="/app" />}/>
                </Route>
                <Route path="/app" element={<MainLayout />}>
                    <Route path="chat" element={<Chat/>}/>
                    <Route path="post" element={<Post/>}/>
                    <Route path="/app" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
