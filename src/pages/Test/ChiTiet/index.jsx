import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addStudent, removeStudent, updateStudent } from '@/redux/Student/Actions';

function ChiTiet() {
    const dispatch = useDispatch();
    const students = useSelector((state) => state.student);

    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        id: '',
        fullName: '',
        photoUrl: '',
        age: '',
        gender: '',
        address: '',
    });

    useEffect(() => {
        if (id !== '0') {
            const foundStudent = students.find((item) => item.id === id);
            if (foundStudent) {
                setStudent(foundStudent);
            }
        } else {
            // Initialize a new person object for creating new entry
            setStudent({
                id: '',
                fullName: '',
                photoUrl: '',
                age: '',
                gender: '',
                address: '',
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (id === '0') {
            // Handle save new entry
            dispatch(addStudent(student));
        } else {
            // Handle update existing entry
            dispatch(updateStudent(student));
        }
        alert('Thành công');
        handleBack();
    };

    const handleDelete = () => {
        if (id !== '0') {
            dispatch(removeStudent(id));
            alert('xóa thành công');
            handleBack();
        }
    };

    const handleBack = () => navigate('/test'); // Quay về trang trước

    return (
        <Box sx={{ padding: 2 }}>
            <h1>{id === '0' ? 'Tạo Mới' : 'Chi Tiết'}</h1>
            <Button variant="contained" onClick={handleBack} sx={{ marginBottom: 2 }}>
                Quay lại
            </Button>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="ID"
                        name="id"
                        value={student.id}
                        onChange={handleChange}
                        InputProps={{ readOnly: id !== '0' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        name="fullName"
                        value={student.fullName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Tuổi"
                        name="age"
                        type="number"
                        value={student.age}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Giới tính"
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ảnh URL"
                        name="photoUrl"
                        value={student.photoUrl}
                        onChange={handleChange}
                    />
                </Grid>
                {student.photoUrl && (
                    <Grid item xs={12}>
                        <img src={student.photoUrl} alt="Avatar" style={{ width: '100px', borderRadius: '8px' }} />
                    </Grid>
                )}
            </Grid>
            <Button
                variant="contained"
                color="success"
                onClick={handleSave}
                sx={{ marginBottom: 2, marginLeft: 1, marginTop: 3 }}
            >
                Lưu
            </Button>
            {id !== '0' && (
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ marginBottom: 2, marginLeft: 1, marginTop: 3 }}
                >
                    Xóa
                </Button>
            )}
        </Box>
    );
}

export default ChiTiet;
