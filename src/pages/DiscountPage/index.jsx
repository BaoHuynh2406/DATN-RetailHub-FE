import { Box, Button, IconButton, Typography } from '@mui/material';
import TablePagination from '@/components/TableCustom/TablePagination';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState, useMemo } from 'react';
import { fetchAllDiscounts } from '@/redux/Discount/discountSlice';
import SearchProductDialog from '@/components/SearchProductDialog'; // Import SearchProductDialog
import DiscountDialog from './DiscountDialog'; // Import DiscountDialog

function DiscountPage() {
    const [openSearchDialog, setOpenSearchDialog] = useState(false); // Trạng thái mở SearchProductDialog
    const [openDiscountDialog, setOpenDiscountDialog] = useState(false); // Trạng thái mở DiscountDialog
    const [selectedProductId, setSelectedProductId] = useState(null); // Lưu id của sản phẩm đã chọn
    const [isCreate, setIsCreate] = useState(false);

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

    const columns = useMemo(
        () => [
            { field: 'id', headerName: 'ID', width: 150 },
            { field: 'productId', headerName: 'Sản phẩm', width: 150 },
            { field: 'discountRate', headerName: 'Tỉ lệ giảm', width: 210 },
            { field: 'startDate', headerName: 'Ngày bắt đầu', width: 170 },
            { field: 'endDate', headerName: 'Ngày kết thúc', width: 150 },
            { field: 'active', headerName: 'Trạng thái', width: 150 },
            {
                field: 'actions',
                headerName: 'Công cụ',
                width: 150,
                renderCell: (params) => (
                    <Box display="flex" justifyContent="left" alignItems="center" height="100%">
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
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
                isCreate={isCreate}
            />
        </Box>
    );
}

export default DiscountPage;
