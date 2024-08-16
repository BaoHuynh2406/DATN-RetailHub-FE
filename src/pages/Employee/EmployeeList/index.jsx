import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Margin } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// import avtvu from './avtvu.jpg'
function createData(id, code, name, phone, image, role, startingdate) {
    return {
        id,
        code,
        name,
        phone,
        image,
        role,
        startingdate,
    };
}

const rows = [
    createData(1, 'NV001', 'aguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'manage', '1/02/2023'),
    createData(2, 'NV002', 'bguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'amanage', '2/02/2023'),
    createData(3, 'NV003', 'cguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'bmanage', '3/02/2023'),
    createData(4, 'NV004', 'dguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'cmanage', '4/02/2023'),
    createData(5, 'NV005', 'eguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'dmanage', '5/02/2023'),
    createData(6, 'NV006', 'fguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'emanage', '6/02/2023'),
    createData(7, 'NV007', 'kguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'fmanage', '7/02/2023'),
    createData(8, 'NV008', 'lguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'gmanage', '8/02/2023'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'code',
        numeric: false,
        disablePadding: true,
        label: 'Mã nhân viên',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Họ và tên',
    },
    {
        id: 'phone',
        numeric: true,
        disablePadding: false,
        label: 'SĐT',
    },
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Hình',
    },
    {
        id: 'role',
        numeric: true,
        disablePadding: false,
        label: 'Vai trò',
    },
    {
        id: 'startingdate',
        numeric: true,
        disablePadding: false,
        label: 'Ngày vào làm',
    },
    {
        id: 'tools',
        label: 'Công cụ',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        if (property !== 'image' && property !== 'tools') {
            // Bỏ qua cột hình ảnh và công cụ
            onRequestSort(event, property);
        }
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.id === 'image' || headCell.id === 'tools' ? (
                            headCell.label // Không áp dụng TableSortLabel cho cột hình ảnh và công cụ
                        ) : (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
};

export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const navigate = useNavigate();
    //chuyentrang qua trang employeesdetail
    const handleRowClick = (id) => {
        console.log(`Row clicked with ID: ${id}`); // Debugging
        navigate(`/employee/EmployeeDetail/${id}`);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between', // Căn chỉnh các phần tử ở hai đầu
                alignItems: 'center', // Căn chỉnh các phần tử theo chiều dọc
                padding: ' 16px', // Padding xung quanh Box, có thể điều chỉnh theo nhu cầu
            }}
        >
            <Paper sx={{ width: '100%', mb: 2, paddingLeft: 5 }}>
                <Typography
                    variant="h4"
                    sx={{ textAlign: 'center', mb: 2, mt: 2 }} // Căn giữa và thêm margin dưới
                >
                    Danh sách nhân viên
                </Typography>

                <TableContainer sx={{ maxHeight: 450 }}>
                    <Table
                        stickyHeader // Tùy chọn này sẽ giữ cố định header của bảng khi cuộn
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        onClick={() => handleRowClick(row.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell align="left">{row.code}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.phone}</TableCell>
                                        <TableCell align="left">
                                            <img
                                                src={row.image}
                                                alt="avatar"
                                                style={{ width: '50px', height: 'auto' }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{row.role}</TableCell>
                                        <TableCell align="left">{row.startingdate}</TableCell>
                                        <TableCell align="left">
                                            <EditNoteIcon />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    display="flex"
                    justifyContent="space-between" // Căn chỉnh hai phần tử sao cho đều nhau
                    alignItems="center" // Căn chỉnh theo chiều dọc
                    p={2} // Khoảng cách padding nếu cần
                >
                    <FormControlLabel
                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                        label="Thu nhỏ"
                    />
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Xem" // Thêm thuộc tính này để hiển thị nhãn
                        labelDisplayedRows={({ from, to, count }) => ` Hiển thị ${from} - ${to} của ${count}`} // Tùy chỉnh cách hiển thị số hàng
                    />
                </Box>
            </Paper>
        </Box>
    );
}
