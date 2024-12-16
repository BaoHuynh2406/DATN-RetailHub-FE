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
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { postUserLogin } from '@/redux/UserCurrent';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
});

export default function SignInSide() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openDialog, setOpenDialog] = useState(false); // State quản lý dialog
    const [ipAddress, setIpAddress] = useState(localStorage.getItem('ip') || '');

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleSaveIp = () => {
        if (!ipAddress) {
            return;
        }
        localStorage.setItem('ip', ipAddress); // Lưu IP vào localStorage
        notyf.success('Đã lưu IP đăng nhập'); // Hiển thị thông báo
        handleCloseDialog();
    };

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
            alert('Sai thông tin! ' + error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleForgotPassword = () => {
        navigate('/forgotpassword');
    };

    return (
        <>
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
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={handleForgotPassword}
                                sx={{
                                    mt: 1,
                                    mb: 2,
                                    color: 'secondary.main',
                                    borderColor: 'secondary.main',
                                    '&:hover': {
                                        borderColor: 'secondary.dark',
                                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                                    },
                                    borderRadius: 2,
                                    height: '32px',
                                }}
                            >
                                Quên mật khẩu?
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Box
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 999,
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                    sx={{
                        minWidth: '48px',
                        minHeight: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: 3,
                    }}
                >
                    <SettingsIcon />
                </Button>
            </Box>

            {/* Dialog nhập IP */}
            <Dialog open={openDialog} maxWidth="sm" onClose={handleCloseDialog}>
                <DialogTitle>IP Server</DialogTitle>
                <DialogContent
                    sx={{
                        width: '100%',
                    }}
                >
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        id="ip"
                        type="text"
                        variant="outlined"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Hủy
                    </Button>
                    <Button
                        onClick={() => {
                            localStorage.removeItem('ip'); // Xóa IP khỏi localStorage
                            setIpAddress(''); // Cập nhật state ipAddress thành giá trị mặc định (rỗng)
                            handleCloseDialog();
                        }}
                        color="secondary"
                    >
                        Khôi phục mặc định
                    </Button>
                    <Button onClick={handleSaveIp} color="primary">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
