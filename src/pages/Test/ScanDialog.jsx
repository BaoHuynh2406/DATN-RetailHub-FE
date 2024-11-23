import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { BrowserMultiFormatReader } from '@zxing/browser';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ScanDialog({ open, handleClose }) {
    const [devices, setDevices] = useState([]); // Danh sách camera
    const [selectedDevice, setSelectedDevice] = useState(''); // Camera được chọn
    const [codeReader] = useState(new BrowserMultiFormatReader()); // Tạo mã đọc QR
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getDevices() {
            const videoDevices = await BrowserMultiFormatReader.listVideoInputDevices();
            setDevices(videoDevices); // Cập nhật danh sách thiết bị
            if (videoDevices.length > 0) {
                setSelectedDevice(videoDevices[0].deviceId); // Chọn mặc định thiết bị đầu tiên
            }
        }
        getDevices();
    }, []);

    useEffect(() => {
        if (selectedDevice && open) {
            codeReader.decodeFromVideoDevice(selectedDevice, 'video', (result, err) => {
                if (result) {
                    setData(result.text);
                }
            });
        }
    }, [selectedDevice, codeReader]);

    useEffect(() => {
        if (data) {
            stopScan();
            handleClose(data);
        }
    }, [data]);

    const stopScan = () => {
        // Dừng camera và giải phóng tài nguyên
        try {
            // Hủy liên kết giữa codeReader và video element
            codeReader.decodeFromVideoDevice(null, 'video', () => {});

            // Dừng tất cả các track của video stream
            const videoElement = document.getElementById('video');
            if (videoElement && videoElement.srcObject) {
                const stream = videoElement.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => {
                    track.stop(); // Dừng từng track
                });
                videoElement.srcObject = null; // Xóa stream khỏi video element
            }
        } catch (error) {
            console.error('Error stopping camera:', error);
        }
    };

    const onClose = () => {
        stopScan();
        handleClose();
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            fullWidth="sm"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{'Quét mã'}</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '-webkit-fill-available',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 20px',
                    }}
                >
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <Typography sx={{ marginBottom: 1 }}>Chọn camera</Typography>
                        <Select
                            labelId="camera-select-label"
                            value={selectedDevice}
                            onChange={(e) => setSelectedDevice(e.target.value)}
                        >
                            {devices.map((device) => (
                                <MenuItem key={device.deviceId} value={device.deviceId}>
                                    {device.label || `Camera ${device.deviceId}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box
                        sx={{
                            position: 'relative',
                            width: '300px',
                            height: '280px',
                            borderRadius: '10px',
                            overflow: 'visible',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <video
                            id="video"
                            style={{
                                width: '300px',
                                height: '280px',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                border: '2px solid rgb(29, 33, 46)',
                            }}
                        />

                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                pointerEvents: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '4px',
                                    backgroundColor: 'red',
                                    borderRadius: '10px',
                                    animation: 'scanline 3s infinite ease-in-out',
                                    background:
                                        'linear-gradient(90deg, rgba(255,0,0,0) 0%, rgba(255,0,0,1) 50%, rgba(255,0,0,0) 100%)',
                                    filter: 'brightness(1.5)',
                                }}
                            />
                        </Box>
                    </Box>

                    <Typography variant="h6" sx={{ marginTop: 2, color: 'gray' }}>
                        Đang quét...
                    </Typography>

                    <style>
                        {`
            @keyframes scanline {
                0% {
                    filter: brightness(1.2);
                    transform: translateY(-140px);
                }
                50% {
                    filter: brightness(1.5); 
                    transform: translateY(140px);
                }
                100% {
                     filter: brightness(1.2);
                    transform: translateY(-140px);
                }
            }
        `}
                    </style>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ScanDialog;
