import * as React from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import dataTest from '../Data';

const columns = [
    { field: 'id', headerName: 'Mã sinh viên', width: 100 },
    { field: 'fullName', headerName: 'Họ và tên', width: 200 },
    { field: 'age', headerName: 'Tuổi', width: 130 },
    { field: 'gender', headerName: 'Giới tính', width: 90 },
    { field: 'address', headerName: 'Địa chỉ', width: 300 },
    {
        field: 'photoUrl',
        headerName: 'Ảnh',
        width: 150,
        renderCell: (params) => <img src={params.value} alt="Ảnh" className="h-15 w-12" />,
    },
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

const handleEdit = (row) => {
    console.log('Chỉnh sửa:', row);
};

const handleDelete = (row) => {
    console.log('Xóa:', row);
};

function QuickSearchToolbar() {
    return (
        <div className="py-2 ps-1 ">
            <GridToolbarQuickFilter />
        </div>
    );
}

export default function DataTable() {
    return (
        <div className="p-4">
            <h2>Danh sách sinh viên</h2>

            <Button className="my-3 bg-green-600" variant="contained" endIcon={<AddCircleIcon />}>
                Thêm mới
            </Button>

            <div className="w-100 h-100">
                <DataGrid
                    autoHeight
                    className="w-fit"
                    columns={columns}
                    rows={dataTest}
                    rowHeight={60}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    slots={{ toolbar: QuickSearchToolbar }}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                            textAlign: 'center',
                            width: '100%',
                        },
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                    }}
                />
            </div>
        </div>
    );
}
