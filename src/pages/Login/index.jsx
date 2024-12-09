import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { postUserLogin } from '@/redux/UserCurrent';

export default function SignInSide() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State để theo dõi checkbox "Ghi nhớ tài khoản"
    const [rememberMe, setRememberMe] = useState(false);

    // Tải thông tin từ localStorage khi component được mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        const savedPassword = localStorage.getItem('userPassword');
        
        if (savedEmail && savedPassword) {
            emailRef.current.value = savedEmail;
            passwordRef.current.value = savedPassword;
            setRememberMe(true);
        }
    }, []);

    const handleLogin = async () => {
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            await dispatch(postUserLogin(user)).unwrap();
            // Nếu checkbox "Ghi nhớ tài khoản" được chọn, lưu email và mật khẩu vào localStorage
            if (rememberMe) {
                localStorage.setItem('userEmail', user.email);
                localStorage.setItem('userPassword', user.password);
            } else {
                // Xóa dữ liệu trong localStorage nếu không chọn checkbox
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userPassword');
            }
            navigate('/dashboard'); 
        } catch (error) {
            alert("Sai thông tin! " + error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(/assets/images/background.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            inputRef={emailRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            inputRef={passwordRef}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="remember"
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                            }
                            label="Ghi nhớ tài khoản"
                        />
                        <Button
                            className="font-bold h-15"
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="forgotpassword" variant="body2">
                                    Quên mật khẩu?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
