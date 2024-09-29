import * as React from 'react';
import TablePagination from '@/components/TableCustom/TablePagination.jsx'

import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployeesAsync, restoreEmployeeAsync, toggleActiveEmployeeAsync } from '@/redux/Employee/employeeSlice';
import { fetchProductsAsync, fetchDeletedProductsAsync, updateProductAsync, removeProductAsync } from '@/redux/Product/ProductSlice';
import { Box, Button, Container, Typography, IconButton, Switch, CircularProgress, Alert } from '@mui/material';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Explicit as ExplicitIcon } from '@mui/icons-material';


export default function Test() {

    const dispatch = useDispatch();

    const showDeleted = false;

    const { loading, data, error, currentData } = useSelector((state) => state.employeeNew);

    const columns =React.useMemo(() => [
        { field: 'productId', headerName: 'Mã Sản phẩm', width: 150 },
        {
            field: 'image',
            headerName: 'Hình',
            width: 150,
            renderCell: (params) => (
                <img src={params.value} alt={params.row.img} style={{ width: '100%', height: 'auto' }} />
            ),
        },
        {
            field: 'category',
            headerName: 'Loại',
            width: 120,
            renderCell: (params) => {
                console.log(params.row);  // Log the entire row to verify the structure
                return params.row.category?.category_name || 'Không có loại';
            }
        },
        {
            field: 'tax',
            headerName: 'Thuế',
            width: 120,
            renderCell: (params) => params.row.tax?.tax_name || 'Không có thuế'
        },
        { field: 'unit', headerName: 'Đơn vị tính', width: 100 },
        { field: 'inventoryCount', headerName: 'Tồn kho', width: 120 },
        { field: 'cost', headerName: 'Giá gốc', width: 120 },
        { field: 'price', headerName: 'Giá bán', width: 120 },
        { field: 'expiryDate', headerName: 'Ngày hết hạn', width: 150 },
        {
            field: 'actions',
            headerName: 'Công cụ',
            width: 150,
            align: 'center',
            renderCell: (params) => (
                <Box display="flex" justifyContent="left" alignItems="center">
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ], [showDeleted]);



    return (
        <div style={{ height: 400, width: '100%' }}>
            <TablePagination
                columns={columns}       
                dispatchHandle={fetchProductsAsync}
                sliceName="ProductSlice"
                id="productId"                  
                stt={true}              
            />
        </div>
    );
}
