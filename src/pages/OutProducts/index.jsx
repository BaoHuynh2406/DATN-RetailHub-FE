import { Box, Button, Container, Divider } from '@mui/material';
import TableOfContent from './table';
import BoLoc from './bolocc';
import dayjs from 'dayjs';
import ExplicitIcon from '@mui/icons-material/Explicit';
import ExcelJS from 'exceljs'; // Import thư viện exceljs
import { useSelector } from 'react-redux'; // Để lấy dữ liệu từ Redux
import { useState } from 'react';
import handleExport from '@/hooks/useExportExcel';

export default function Invoice() {
    const [invoiceDays, setInvoiceDays] = useState(1);
    const [viewMode, setViewMode] = useState('total');
    const [sort, setSort] = useState('des');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

    // Lấy dữ liệu từ Redux
    const invoiceData = useSelector((state) => state.outProduct?.data?.data || []);

    const handleChange = (event) => {
        setInvoiceDays(event.target.value);
        const value = event.target.value;

        let start, end;
        const today = dayjs();

        if (value === 1) {
            start = today.startOf('day');
            end = today.endOf('day');
        } else if (value === 7) {
            start = today.startOf('week');
            end = today.endOf('week');
        } else if (value === 30) {
            start = today.startOf('month');
            end = today.endOf('month');
        }

        setStartDate(start);
        setEndDate(end);
    };

    // Hàm xuất Excel sử dụng ExcelJS
    const handleExportExcel = async () => {
        // Định nghĩa các cột
        const columns = [
            { header: 'STT', key: 'STT', width: 10 },
            { header: 'Mã sản phẩm', key: 'productId', width: 15 },
            { header: 'Tên sản phẩm', key: 'productName', width: 25 },
            { header: 'Ảnh', key: 'image', width: 20 },
            { header: 'Đơn vị tính', key: 'unit', width: 15 },
            { header: 'Số lượng', key: 'quantitySold', width: 15 },
        ];

        if (!invoiceData) return;
        handleExport(columns, invoiceData, 'DanhSachSanPhamXuatKho');
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
            <Box display="flex" flexWrap="wrap" alignItems="center" marginBottom={1}>
                {/* Bộ lộc */}
                <BoLoc
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    handleChange={handleChange}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    invoiceDays={invoiceDays}
                    sort={sort}
                    setSort={setSort}
                />
            </Box>

            {/* Danh sách hóa đơn */}
            <Divider />
            <TableOfContent startDate={startDate} endDate={endDate} />

            {/* Nút xuất Excel */}
            <Button
                sx={{ marginY: '20px', fontSize: 10 }}
                variant="contained"
                startIcon={<ExplicitIcon />}
                onClick={handleExportExcel}
            >
                Xuất Excel
            </Button>
        </Container>
    );
}
