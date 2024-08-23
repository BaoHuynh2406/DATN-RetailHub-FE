import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TableCustom from '@/components/TableCustom';
import { useNavigate } from 'react-router-dom';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, removeStudent, updateStudent } from '@/redux/Student/Actions';

export default function DataTable() {
    const navigate = useNavigate();

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

    const dispatch = useDispatch();
    const dataStudents = useSelector((state) => state.student);

    const handleEdit = (row) => {
        navigate(`/test/detail/${row.id}`);
    };

    const handleAdd = (row) => {
        navigate('/test/detail/0');
    };

    const handleDelete = (row) => {
        dispatch(removeStudent(row.id));
    };

    return (
        <div className="p-4">
            <h2>Danh sách sinh viên</h2>
            <Button onClick={handleAdd} className="my-3 bg-green-   600" variant="contained" endIcon={<AddCircleIcon />}>
                Thêm mới
            </Button>

            <div className='w-max' style={{ height: '500px' }}>
                <TableCustom columns={columns} rows={dataStudents} stt={true} />
            </div>
        </div>
    );
}
