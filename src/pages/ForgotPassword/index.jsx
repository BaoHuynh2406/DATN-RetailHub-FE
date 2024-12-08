import * as React from 'react';
import { useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export default function ResetPassword() {
    const emailRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [step, setStep] = useState(1); // Step 1: Nhập email, Step 2: Nhập mật khẩu mới

    const handleSendCode = () => {
        const email = emailRef.current.value;

        if (!email) {
            alert("Vui lòng nhập email!");
            return;
        }

        // Giả lập gửi mã khôi phục (thay bằng logic thực tế khi tích hợp API)
        alert(`Mã khôi phục đã được gửi tới email: ${email}`);
        setStep(2); // Chuyển sang bước 2: Nhập mật khẩu mới
    };

    const handleResetPassword = () => {
        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!newPassword || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        // Giả lập đặt lại mật khẩu (thay bằng logic thực tế khi tích hợp API)
        alert("Mật khẩu đã được đặt lại thành công!");
        // Điều hướng người dùng về trang đăng nhập (nếu cần)
        window.location.href = "/login";
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
                        {step === 1 ? "Khôi phục mật khẩu" : "Đặt mật khẩu mới"}
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        {step === 1 && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Nhập email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    inputRef={emailRef}
                                />
                                <Button
                                    onClick={handleSendCode}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Gửi mã
                                </Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="new-password"
                                    label="Mật khẩu mới"
                                    type="password"
                                    inputRef={newPasswordRef}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirm-password"
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    inputRef={confirmPasswordRef}
                                />
                                <Button
                                    onClick={handleResetPassword}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Đặt lại mật khẩu
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
