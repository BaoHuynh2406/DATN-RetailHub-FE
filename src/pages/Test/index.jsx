import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
import ScanDialog from './ScanDialog';

function Test() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (data) => {
        setOpen(false);
        if (data) setData(data);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Slide in alert dialog
            </Button>

            <h1>{data && data}</h1>

            {open && <ScanDialog handleClose={handleClose} open={open} />}
        </>
    );
}

export default Test;
