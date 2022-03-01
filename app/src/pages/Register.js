import {Link as RouterLink} from 'react-router-dom';
import {Box, Container, Link, Stack, Typography} from '@mui/material';
import {AuthSocial, RegisterForm} from '../components';

export default function Register() {
    return (
        <Container>
            <Stack width="100%" height="100%" alignItems="center" justifyContent="center">
                <Box sx={{width: 500}}>
                    <Box sx={{mb: 5}}>
                        <Typography variant="h4" gutterBottom>
                            Get started absolutely free.
                        </Typography>
                        <Typography sx={{color: 'text.secondary'}}>
                            Free forever. No credit card needed.
                        </Typography>
                    </Box>

                    <AuthSocial/>

                    <RegisterForm/>

                    <Typography variant="body2" align="center" sx={{color: 'text.secondary', mt: 3}}>
                        By registering, I agree to Minimal&nbsp;
                        <Link underline="always" sx={{color: 'text.primary'}}>
                            Terms of Service
                        </Link>
                        &nbsp;and&nbsp;
                        <Link underline="always" sx={{color: 'text.primary'}}>
                            Privacy Policy
                        </Link>
                        .
                    </Typography>

                    <Typography variant="subtitle2" sx={{mt: 3, textAlign: 'center'}}>
                        Already have an account?&nbsp;
                        <Link to="/login" component={RouterLink}>
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
}
