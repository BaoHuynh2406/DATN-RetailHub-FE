import React, { useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';

import BarcodeLookup from './BarcodeLookUp';
import { Padding } from '@mui/icons-material';

function Test() {
    const textFieldRef = useRef(null);

    const handleButtonClick = () => {
        const barcode = textFieldRef.current.value;
        const data = BarcodeLookup(barcode);
        console.log(data);
    };

    return (
        <>
            <Box
                sx={{
                    padding: 10,
                }}
            >
                <TextField inputRef={textFieldRef} label="Nhập nội dung" variant="outlined" fullWidth />
                <Button className="mt-2" variant="contained" color="primary" onClick={handleButtonClick}>
                    Test
                </Button>
            </Box>
        </>
    );
}

export default Test;
