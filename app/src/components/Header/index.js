import React, {useEffect} from 'react';
import {AppBar, Box, InputAdornment, Stack, styled, Tab, Tabs, TextField, Toolbar,Button} from "@mui/material";
import { Search} from "@mui/icons-material";
import AccountPopover from "./AccountPopover";
import {useNavigate} from "react-router-dom";

const SearchBar = styled(TextField)({
    width: "50%",
});

const routes = ["/app", "/app/chat", "/app/post"];

function Header() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, index) => {
        navigate(routes[index]);
        setValue(index);
    };
    function handleChangeL () {
        navigate("/login");
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    paddingX: { xs: 0, sm: 3, md: 8 },
                    paddingTop: { xs: 0, sm: 1, md: 2 },
                    background: "#fff",
                }}
            >
                <Toolbar>
                    <SearchBar
                        placeholder={"Search"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{width: "100%"}}/>
                    <Box sx={{ p: 2, pt: 1.5 }}>
                    <Button onClick={handleChangeL}
                        fullWidth
                        color="inherit"
                        variant="contained"
                    >
                        LogIn
                    </Button>
                </Box>
                    <AccountPopover/>
                </Toolbar>
                <Stack>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Home"/>
                        <Tab label="Chat"/>
                        <Tab label="Post"/>
                    </Tabs>
                </Stack>
            </AppBar>
        </>
    );
}

export default Header;