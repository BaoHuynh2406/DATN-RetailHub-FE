import ExcelJS from 'exceljs';

const ExportExcel = async (column, row, fileName) => {
    if (!column || !row) {
        console.log('Không có gì để xuất');
        return;
    }
    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Danh sách hóa đơn');

    // Định nghĩa các cột
    worksheet.columns = column;

    // Dữ liệu cho bảng
    row.forEach((item, index) => {
        // Thêm dữ liệu vào worksheet
        worksheet.addRow({
            STT: index + 1,
            ...item,
        });
    });

    // Định dạng tiêu đề (Bold và màu nền)
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FAF0E6' },
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
        };
    });

    // Định dạng cho các ô dữ liệu (căn giữa và có viền)
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            // Bỏ qua hàng tiêu đề
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    right: { style: 'thin' },
                    bottom: { style: 'thin' },
                };
            });
        }
    });

    // Xuất file Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${fileName}.xlsx`;
        link.click();
    });
};

export default ExportExcel;
