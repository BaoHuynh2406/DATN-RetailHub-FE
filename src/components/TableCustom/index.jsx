import {
    DataGrid,
    GridToolbarQuickFilter,
    useGridApiContext,
    useGridSelector,
    gridPageSelector,
    gridPageCountSelector,
    gridPageSizeSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
function CustomToolbar() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 20px' }}>
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) => searchInput.split(' ')}
                inputProps={{ placeholder: 'Tìm kiếm...' }}
            />
        </div>
    );
}
function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
    const handlePageSizeChange = (event) => {
        apiRef.current.setPageSize(event.target.value);
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Hàng mỗi trang:</span>
            <Select
                value={pageSize}
                onChange={handlePageSizeChange}
                sx={{
                    marginRight: 3,
                    border: 'none',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }}
            >
                {[5, 10, 20, 50, 100].map((size) => (
                    <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                ))}
            </Select>
            <Pagination
                color="primary"
                page={page + 1}
                count={pageCount}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        onClick={(event) => {
                            apiRef.current.setPage(item.page - 1);
                        }}
                    />
                )}
            />
        </div>
    );
}
function TableCustom({ columns, rows, id='id', rowHeight = 60}) {
    return (
        <DataGrid
            autoHeight
            columns={columns}
            rows={rows}
            rowHeight={rowHeight}
            getRowId={(row) => row[id]}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            slots={{
                toolbar: CustomToolbar,
                pagination: CustomPagination,
            }}
            slotProps={{
                loadingOverlay: {
                    variant: 'linear-progress',
                    noRowsVariant: 'skeleton',
                },
            }}
            localeText={{
                toolbarDensity: 'Mật độ',
                toolbarDensityLabel: 'Mật độ',
                toolbarDensityCompact: 'Nhỏ gọn',
                toolbarDensityStandard: 'Tiêu chuẩn',
                toolbarDensityComfortable: 'Thoải mái',
                toolbarColumns: 'Cột',
                toolbarColumnsLabel: 'Chọn cột',
                toolbarFilters: 'Bộ lọc',
                toolbarFiltersLabel: 'Hiển thị bộ lọc',
                toolbarExport: 'Xuất',
                toolbarExportLabel: 'Xuất',
                toolbarExportCSV: 'Tải xuống CSV',
                toolbarExportPrint: 'In',
                noRowsLabel: 'Không có hàng nào',
                noResultsOverlayLabel: 'Không tìm thấy kết quả.',
                footerRowSelected: (count) =>
                    count !== 1 ? `${count.toLocaleString()} hàng đã chọn` : `${count.toLocaleString()} hàng đã chọn`,
                columnMenuSortAsc: 'Sắp xếp tăng dần',
                columnMenuSortDesc: 'Sắp xếp giảm dần',
                columnMenuFilter: 'Lọc',
                columnMenuHideColumn: 'Ẩn cột',
                columnMenuShowColumns: 'Hiển thị cột',
                columnMenuUnsort: 'Bỏ sắp xếp',
                columnMenuManageColumns: 'Quản lý cột',
            }}
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
    );
}
export default TableCustom;
