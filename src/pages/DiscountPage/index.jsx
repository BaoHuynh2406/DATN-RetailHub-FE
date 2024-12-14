import { Box, Button, IconButton, Typography } from '@mui/material';
import TablePagination from '@/components/TableCustom/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState, useMemo } from 'react';
import { fetchAllDiscounts } from '@/redux/Discount/discountSlice';
import SearchProductDialog from '@/components/SearchProductDialog'; // Import SearchProductDialog
import DiscountDialog from './DiscountDialog'; // Import DiscountDialog
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { axiosSecure } from '@/config/axiosInstance';
import { useDispatch } from 'react-redux';

function DiscountPage() {
    const [openSearchDialog, setOpenSearchDialog] = useState(false); // Trạng thái mở SearchProductDialog
    const [openDiscountDialog, setOpenDiscountDialog] = useState(false); // Trạng thái mở DiscountDialog
    const [selectedProductId, setSelectedProductId] = useState(null); // Lưu id của sản phẩm đã chọn
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [isCreate, setIsCreate] = useState(false);
    const dispatch = useDispatch();

    const handleOpenSearchDialog = () => {
        setOpenSearchDialog(true);
    };

    const handleCloseSearchDialog = () => {
        setOpenSearchDialog(false);
    };

    const handleOpenDiscountDialog = (isCreate) => {
        setOpenDiscountDialog(true);
        setIsCreate(isCreate); // Lưu trạng thái mở DiscountDialog (true: mở dialog tạo mới, false: mở dialog cập nhật)
    };

    const handleCloseDiscountDialog = () => {
        setOpenDiscountDialog(false);
    };

    const handleSearch = (productId) => {
        setSelectedProductId(productId); // Lưu productId vào state
        console.log('Selected product ID:', productId);
        handleCloseSearchDialog(); // Đóng SearchProductDialog
        handleOpenDiscountDialog(true); // Mở DiscountDialog khi đã chọn sản phẩm
    };

    const handleEdit = (row) => {
        setSelectedDiscount(row.id);
        handleOpenDiscountDialog(false);
    };

    const handleDelete = async (row) => {
        await axiosSecure.delete(`/api/discount/delete/${row.id}`);
        dispatch(fetchAllDiscounts({ page: 1, size: 10 }));
    };

    const formatDateTime = (isoString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(isoString).toLocaleString('vi-VN', options);
    };

    const columns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 10 },
            { field: 'productId', headerName: 'ID Sản phẩm', width: 100 },
            { field: 'productName', headerName: 'Tên sản phẩm', width: 150 },
            {
                field: 'image',
                headerName: 'Ảnh',
                headerAlign: 'center',
                width: 150,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <img
                            src={params.row.image}
                            alt="Product"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    </Box>
                ),
            },
            {
                field: 'price',
                headerName: 'Giá gốc (VNĐ)',
                width: 150,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <Typography>{params.row.price.toLocaleString('vi-VN')} đ</Typography>
                    </Box>
                ),
            },
            {
                field: 'discountRate',
                headerName: 'Tỉ lệ giảm',
                width: 100,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <Typography>{(params.row.discountRate * 100).toFixed(2)}%</Typography>,
                    </Box>
                ),
            },
            {
                field: 'priceAfter',
                headerName: 'Giá đã giảm (VNĐ)',
                width: 150,
                renderCell: (params) => {
                    const discountedPrice = params.row.price - params.row.price * params.row.discountRate;
                    return (
                        <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                            <Typography sx={{ color: '#c4943c', fontWeight: 'bold' }}>
                                {discountedPrice.toLocaleString('vi-VN')} đ
                            </Typography>
                        </Box>
                    );
                },
            },
            {
                field: 'startDate',
                headerName: 'Bắt đầu',
                width: 170,
                headerAlign: 'center',
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <Typography textAlign="center">{formatDateTime(params.row.startDate)}</Typography>
                    </Box>
                ),
            },
            {
                field: 'endDate',
                headerName: 'Kết thúc',
                width: 170,
                headerAlign: 'center',
                renderCell: (params) => {
                    const now = new Date();
                    const endDate = new Date(params.row.endDate);
                    // Kiểm tra ngày kết thúc
                    const isExpired = endDate < now;

                    return (
                        <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                            <Typography
                                textAlign="center"
                                sx={{
                                    color: isExpired ? 'red' : 'green',
                                    fontWeight: 'bold',
                                }}
                            >
                                {formatDateTime(params.row.endDate)}
                            </Typography>
                        </Box>
                    );
                },
            },
            {
                field: 'active',
                headerName: 'Trạng thái',
                width: 150,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <Typography
                            sx={{
                                color: params.row.active ? 'green' : 'red',
                                fontWeight: 'bold',
                            }}
                        >
                            {params.row.active ? 'Đang hoạt động' : 'Đã dừng'}
                        </Typography>
                    </Box>
                ),
            },
            {
                field: 'actions',
                headerName: 'Công cụ',
                width: 150,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleDelete(params.row)}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Box>
                ),
            },
        ],
        [],
    );

    return (
        <Box sx={{ padding: '20px 30px' }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom={3}>
                <Typography variant="h4" component="h2" fontWeight="bold" color="inherit">
                    DANH SÁCH KHUYẾN MÃI
                </Typography>
                {/* Nút thêm mới */}
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddCircleRoundedIcon />}
                    onClick={handleOpenSearchDialog}
                    sx={{
                        marginBottom: '10px',
                    }}
                >
                    Thêm mới
                </Button>
            </Box>

            <TablePagination
                columns={columns} // Truyền cấu hình các cột
                id="id" // Đặt định danh duy nhất cho các hàng
                dispatchHandle={fetchAllDiscounts}
                sliceName="discount" // Chỉ định tên slice cho Redux store
            />

            {/* Sử dụng SearchProductDialog */}
            <SearchProductDialog open={openSearchDialog} onClose={handleCloseSearchDialog} onSearch={handleSearch} />

            {/* Sử dụng DiscountDialog và truyền selectedProductId */}
            <DiscountDialog
                open={openDiscountDialog}
                onClose={handleCloseDiscountDialog}
                productId={selectedProductId}
                discountId={selectedDiscount}
                isCreate={isCreate}
            />
        </Box>
    );
}

export default DiscountPage;
