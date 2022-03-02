import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

ReactDOM.render(
    <React.StrictMode>
        <ThemeConfig>
            <GlobalStyles />
            <App/>
        </ThemeConfig>
    </React.StrictMode>,
    document.getElementById('root')
);
