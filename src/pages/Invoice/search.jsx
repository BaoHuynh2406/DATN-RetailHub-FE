import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '@/redux/Invoice/invoiceSlice';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        dispatch(search({ page: 1, size: 10, keyword: event.target.value }));
    };

    return (
        <>
            {' '}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: '#f1f1f1',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                }}
            >
                <SearchIcon />
                <InputBase
                    placeholder="Tìm kiếm hóa đơn..."
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ ml: 1, flex: 1 }}
                />
            </Box>
        </>
    );
}

export default Search;
