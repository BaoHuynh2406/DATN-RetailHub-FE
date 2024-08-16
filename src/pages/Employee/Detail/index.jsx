import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const defaultImage = 'https://via.placeholder.com/150';

const employees = [
    {
        employeeId: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
        image: null,
        phone: '123456789',
        address: '123 Main St',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        position: 'developer',
        department: 'IT',
        salary: 50000,
        supervisor: 'Jane Smith'
    },
    {
        employeeId: '2',
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'abcdef',
        image: null,
        phone: '987654321',
        address: '456 Market St',
        startDate: '2022-05-15',
        endDate: '',
        position: 'manager',
        department: 'HR',
        salary: 60000,
        supervisor: 'John Doe'
    },
    // Add more employees as needed...
];

const ImageWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '150px',
    height: '150px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
}));

const StyledImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

const HiddenInput = styled('input')({
    display: 'none',
});

function EmployeeDetail() {
    const [isEditing, setIsEditing] = useState(false);
    const [position, setPosition] = useState('');
    const [formData, setFormData] = useState({
        employeeId: '',
        name: '',
        email: '',
        password: '',
        image: null,
        phone: '',
        address: '',
        startDate: '',
        endDate: '',
        status: true,
    });

    const handleAddNewClick = () => {
        setIsEditing(false);
        setFormData({
            employeeId: '',
            name: '',
            email: '',
            password: '',
            image: null,
            phone: '',
            address: '',
            startDate: '',
            endDate: '',
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSave = () => {
        console.log('Saving data:', formData);
    };

    const handleDelete = () => {
        setFormData((prevData) => ({
            ...prevData,
            status: false, 
        }));
    };
    
    const handleReset = () => {
        setFormData({
            employeeId: '',
            name: '',
            email: '',
            password: '',
            image: null,
            phone: '',
            address: '',
            startDate: '',
            endDate: '',
            status: true,
        });
    };
    

    const handleImageClick = () => {
        document.getElementById('image-upload').click();
    };

    return (
        <>
            <label>{isEditing ? 'Thay đổi thông tin' : 'Thêm mới nhân viên'}</label>
            <div>
                <button onClick={handleAddNewClick}>Thêm mới</button>
                <button onClick={handleEditClick}>Sửa</button>
            </div>
            <br />
            <div style={{ display: 'flex', gap: '16px' }}>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Mã nhân viên:</label>
                            <input
                                type="text"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>SĐT:</label>
                            <input
                                type="number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Họ và tên:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Địa chỉ:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
 
                         <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Mật khẩu:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Chức vụ:</label>
                            <FormControl style={{ width: '50%' }}>
                                <InputLabel id="position-select-label">Chức vụ</InputLabel>
                                <Select
                                    labelId="position-select-label"
                                    id="position-select"
                                    value={position}
                                    label="Chức vụ"
                                    onChange={handlePositionChange}
                                >
                                    <MenuItem value="manager">User</MenuItem>
                                    <MenuItem value="developer">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Ảnh:</label>
                            <ImageWrapper onClick={handleImageClick}>
                                <StyledImage
                                    src={formData.image ? URL.createObjectURL(formData.image) : defaultImage}
                                    alt="Ảnh nhân viên"
                                    onError={(e) => (e.target.src = defaultImage)}
                                />
                                <HiddenInput
                                    type="file"
                                    id="image-upload"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </ImageWrapper>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Ngày vào làm:</label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '150px' }}>Ngày nghỉ:</label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                style={{ width: '50%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Lưu
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Xóa
                </Button>
                <Button variant="contained" color="secondary" onClick={handleReset}>
                    Làm Mới
                </Button>
            </div>
        </>
    );
}

export default EmployeeDetail;
