import { Box, Divider, Typography } from '@mui/material';

function Dashboard({ invoiceDataMini }) {
    // Lọc các hóa đơn có trạng thái "PAID"
    const paidInvoices = invoiceDataMini.filter((invoice) => invoice.status === 'PAID');

    // Tính tổng Doanh Thu, Thuế và Lợi Nhuận
    const totalRevenue = paidInvoices.reduce((sum, invoice) => sum + invoice.finalTotal, 0);
    const totalTax = paidInvoices.reduce((sum, invoice) => sum + invoice.totalTax, 0);
    const totalCost = paidInvoices.reduce((sum, invoice) => sum + invoice.totalCost, 0);
    const totalProfit = totalRevenue - totalTax - totalCost;

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'white',
                    padding: '20px 40px',
                    borderRadius: 1,
                    border: '1px solid #ccc',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    margin: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                {/* Doanh Thu */}
                <Box>
                    <Typography fontWeight="bold">Doanh Thu</Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            color: '#008000',
                            fontWeight: 'bold',
                            lineHeight: '32px',
                            letterSpacing: '-0.02em',
                            margin: '20px 0',
                        }}
                    >
                        {totalRevenue.toLocaleString()}đ
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{
                        height: '60px',
                    }}
                />
                {/* Tổng Thuế */}
                <Box>
                    <Typography fontWeight="bold">Tổng thuế</Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            color: '#d32f2f ',
                            fontWeight: 'bold',
                            lineHeight: '32px',
                            letterSpacing: '-0.02em',
                            margin: '20px 0',
                        }}
                    >
                        {totalTax.toLocaleString()}đ
                    </Typography>
                </Box>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    sx={{
                        height: '60px',
                    }}
                />
                {/* Lợi nhuận */}
                <Box>
                    <Typography fontWeight="bold">Lợi nhuận</Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            color: totalProfit >= 0 ? '#008000' : '#d32f2f',
                            fontWeight: 'bold',
                            lineHeight: '32px',
                            letterSpacing: '-0.02em',
                            margin: '20px 0',
                        }}
                    >
                        {totalProfit.toLocaleString()}đ
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
