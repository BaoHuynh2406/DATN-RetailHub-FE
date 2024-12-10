import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetPasswordCode, resetPassword } from '@/redux/ForgotPassword';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const dispatch = useDispatch();
    const { loading, error, data } = useSelector((state) => state.userCurrent);
    const navigate = useNavigate();


    const emailRef = useRef(null);
    const newPasswordRef = useRef(null);
    const otpCodeRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    
    const [step, setStep] = useState(1); // Bước hiện tại
    const [userEmail, setUserEmail] = useState(""); // Lưu email sau khi gửi mã OTP

    const handleSendCode = async () => {
        const email = emailRef.current.value;
        if (!email) {
            alert("Vui lòng nhập email!");
            return;
        }

        try {
            await dispatch(sendResetPasswordCode(email)).unwrap();
            alert("Mã xác nhận đã được gửi!");
            setUserEmail(email); // Lưu email vào state
            setStep(2); // Chuyển sang bước 2
        } catch (err) {
            alert(err);
        }
    };

    const handleResetPassword = async () => {
        const otp = otpCodeRef.current?.value;
        const newPassword = newPasswordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!newPassword || !confirmPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const payload = {
                otp,
                newPassword,
                email: userEmail, // Lấy email từ state
            };

            console.log("Payload gửi đi:", payload);
            await dispatch(resetPassword(payload)).unwrap();
            alert("Mật khẩu đã được đặt lại thành công!");
            navigate('/login');
        } catch (err) {
            alert(err);
        }
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
                                    disabled={loading}
                                >
                                    {loading ? "Đang gửi..." : "Gửi mã"}
                                </Button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    label="Mã xác nhận"
                                    type="otp"
                                    inputRef={otpCodeRef}
                                />
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
                                    disabled={loading}
                                >
                                    {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
                                </Button>
                            </>
                        )}
                        {error && <Typography color="error">{error}</Typography>}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
