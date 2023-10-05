import {Box, Container, Link, Stack, Typography} from '@mui/material';
import {AuthSocial, LoginForm} from "../components";
import {Link as RouterLink} from "react-router-dom";

export default function Login() {
    return (
        <Container>
            <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
                <Box sx={{width: 500}}>
                    <Stack sx={{mb: 5}}>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Node Bus
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>Enter your details below.</Typography>
                    </Stack>
                    <AuthSocial/>
                    <LoginForm/>
                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Don’t have an account?&nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="/register">
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
}
