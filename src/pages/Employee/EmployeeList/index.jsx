import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import EmployeeData from '../EmployeeData'; // Import your employee data
import TextField from '@mui/material/TextField';
import { useState } from 'react';

// Define the columns for the DataGrid
const columns = [
    { field: 'code', headerName: 'Mã nhân viên', flex: 1 },
    { field: 'name', headerName: 'Họ Và tên', flex: 1 },
    { field: 'phone', headerName: 'SĐT', flex: 1, align: 'left' },
    {
        field: 'image',
        headerName: 'Hình',
        flex: 1,
        renderCell: (params) => (
            <img
                src={params.value}
                alt="Avatar"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
            />
        ),
    },
    { field: 'role', headerName: 'Vai trò', flex: 1 },
    { field: 'startingdate', headerName: 'Ngày vào làm', flex: 1 },
    {
        field: 'edit',
        headerName: 'Chỉnh sửa',
        width: 150,
        renderCell: (params) => (
            <div>
                <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </IconButton>
                <IconButton className="text-red-700" onClick={() => handleDelete(params.row)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        ),
    },
];

// Handler functions for edit and delete actions
const handleEdit = (row) => {
    console.log('Chỉnh sửa:', row);
};

const handleDelete = (row) => {
    console.log('Xóa:', row);
};

function QuickSearchToolbar({ value, onChange }) {
    return (
        <div className="py-2 ps-1">
            <TextField
                variant="outlined"
                size="small"
                value={value}
                onChange={onChange}
                placeholder="Tìm kiếm..."
            />
        </div>
    );
}

// Main component
export default function DataTable() {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    // Filter rows based on search text
    const filteredRows = EmployeeData.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <div className="p-4">
            <h2>Danh sách nhân viên</h2>
            <Button className="my-3 bg-green-600" variant="contained" endIcon={<AddCircleIcon />}>
                Thêm mới
            </Button>

            {/* Scrollable container for the table */}
            <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={filteredRows}
                    rowHeight={60}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    components={{
                        Toolbar: () => <QuickSearchToolbar value={searchText} onChange={handleSearchChange} />,
                    }}
                />
            </div>
        </div>
    );
}