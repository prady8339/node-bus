import * as Yup from 'yup';
import {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Form, FormikProvider, useFormik} from 'formik';
import {Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: true
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
            navigate('/', {replace: true});
        }
    });

    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} = formik;

    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="Email address"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        {...getFieldProps('password')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{my: 2}}>
                    <FormControlLabel
                        control={<Checkbox {...getFieldProps('remember')} checked={values.remember}/>}
                        label="Remember me"
                    />

                    <Link component={RouterLink} variant="subtitle2" to="#">
                        Forgot password?
                    </Link>
                </Stack>

                <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                >
                    Login
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
