import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function CustomPagination(props) {
    const { paginationModel, setPaginationModel, rowCount } = props;
    const pageCount = Math.ceil(rowCount / paginationModel.pageSize);

    const handlePageChange = (event, value) => {
        setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
    };

    const handlePageSizeChange = (event) => {
        setPaginationModel((prev) => ({ ...prev, pageSize: event.target.value, page: 0 }));
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Hàng mỗi trang:</span>
            <Select
                value={paginationModel.pageSize}
                onChange={handlePageSizeChange}
                sx={{
                    marginRight: 3,
                    border: 'none',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                }}
            >
                {[10, 20, 50, 100].map((size) => (
                    <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                ))}
            </Select>
            <Pagination
                color="primary"
                page={paginationModel.page + 1}
                count={pageCount}
                onChange={handlePageChange}
                renderItem={(item) => <PaginationItem {...item} />}
            />
        </div>
    );
}

function TablePagination({
    columns,
    dispatchHandle,
    sliceName,
    id = 'id',
    rowHeight = 60,
    stt = false,
    additionalParams = {},
}) {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    const initialPageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const initialSearchText = searchParams.get('searchInput') || '';

    const { loading, data, error, currentData } = useSelector((state) => state[sliceName]);

    const [rows, setRows] = useState(data);

    const [paginationModel, setPaginationModel] = React.useState({
        page: initialPage - 1,
        pageSize: initialPageSize,
    });

    const [rowCount, setRowCount] = React.useState(0);
    const [searchText, setSearchText] = React.useState('');

    const fetchData = React.useCallback(async () => {
        const { page, pageSize } = paginationModel;

        try {
            dispatch(dispatchHandle({ page: page + 1, size: pageSize, ...additionalParams }));
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }, [paginationModel, searchText, dispatchHandle]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setRows(data.data || []);
        setRowCount(data.totalElements || 0);
    }, [data]);

    useEffect(() => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', paginationModel.page + 1);
        newParams.set('pageSize', paginationModel.pageSize);
        newParams.set('searchInput', searchText);
        setSearchParams(newParams);
    }, [paginationModel, searchText, setSearchParams]);

    const sttColumns = stt
        ? [
              {
                  field: 'STT',
                  headerName: 'STT',
                  width: 70,
                  sortable: false,
                  disableColumnMenu: true,
                  resizable: false,
                  renderCell: (params) =>
                      paginationModel.pageSize * paginationModel.page +
                      params.api.getAllRowIds().indexOf(params.id) +
                      1,
              },
          ]
        : [];

    const allColumns = [...sttColumns, ...columns];

    return (
        <DataGrid
            columns={allColumns}
            rows={rows}
            rowCount={rowCount}
            loading={loading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowHeight={rowHeight}
            getRowId={(row) => row[id]}
            slots={{
                pagination: CustomPagination,
            }}
            slotProps={{
                toolbar: {
                    onSearchChange: (value) => {
                        setSearchText(value);
                        setPaginationModel((prev) => ({ ...prev, page: 0 }));
                    },
                },
                pagination: {
                    paginationModel,
                    setPaginationModel,
                    rowCount,
                },
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
                '& .MuiDataGrid-columnHeader:focus-within': {
                    outline: 'none',
                },
                '& .MuiDataGrid-columnHeader:focus': {
                    outline: 'none',
                },
                '& .MuiDataGrid-columnHeader--sortable:focus': {
                    outline: 'none',
                },
                '& .MuiDataGrid-columnHeader:focus-visible': {
                    outline: 'none',
                },
            }}
        />
    );
}

export default TablePagination;
