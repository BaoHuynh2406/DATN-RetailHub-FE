// TaxList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaxList = ({ taxes, handleOpenModal, handleDelete }) => (
    <>
        <Typography variant="h6">Danh sách thuế</Typography>
        <List>
            {taxes.map((tax) => (
                <ListItem key={tax.taxId}>
                    <ListItemText primary={`${tax.taxId} - ${tax.taxName} - ${tax.taxRate}%`} />
                    <IconButton onClick={() => handleOpenModal('tax', tax)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete('tax', tax.taxId)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal('tax')}>
            Thêm thuế
        </Button>
    </>
);

export default TaxList;
