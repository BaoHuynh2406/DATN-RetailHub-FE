import { Box, IconButton, Typography } from '@mui/material';
import TablePagination from '@/components/TableCustom/TablePagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSalesVolumeStatistics } from '@/redux/Product/outProductSlice';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { axiosSecure } from '@/config/axiosInstance';
function convertCheckboxValuesToString(ck) {
    return Object.keys(ck)
        .filter((key) => ck[key])
        .join(',');
}

function Table({ startDate, endDate}) {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedOutProduct, setSelectedOutProduct] = useState(null);
    const columns = [
        { field: 'productId', headerName: 'Mã sản phẩm', width: 200 },
        {
            field: 'image',
            headerName: 'Ảnh',
            headerAlign: 'center',
            width: 250,
            renderCell: (params) => (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <img
                        src={params.row.image}
                        alt="Product"
                        style={{ width: '100px', height: '50px', objectFit: 'cover' }}
                    />
                </Box>
            ),
        },
        { field: 'productName', headerName: 'Tên sản phẩm', width: 300 },

        { field: 'quantitySold', headerName: 'Số lượng', width: 150 },
    ];

       useEffect(() => {
           dispatch(
               fetchSalesVolumeStatistics({
                   page: 1,
                   size: 20,
                   startDate: formatDateForApi(startDate),
                   endDate: formatDateForApi(endDate),

               }),
           );
       }, [startDate, endDate]);

    const formatDateForApi = (isoDate) => {
        return dayjs(isoDate).format('YYYY-MM-DD');
    };
    return (
        <>
            <Typography marginTop={4} marginBottom={2} variant="h6">
                Danh sách sản phẩm xuất kho
            </Typography>

            {/* Bảng phân trang */}
            <TablePagination
                columns={columns}
                stt={true}
                id="productId"
                dispatchHandle={fetchSalesVolumeStatistics}
                sliceName="outProduct"
                additionalParams={{
                    startDate: formatDateForApi(startDate),
                    endDate: formatDateForApi(endDate),
                }}
            />

            {/* Hiển thị chi tiết sản phẩm khi người dùng click vào "Xem chi tiết"
            {selectedOutProduct && (
                <OutProductDetailDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    outProductData={selectedOutProduct}
                />
            )} */}
        </>
    );
}

export default Table;
