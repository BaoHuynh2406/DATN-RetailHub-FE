// PaymentMethodList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PaymentMethodList = ({ paymentMethods, handleOpenModal, handleDelete }) => (
    <>
        <Typography variant="h6">Danh sách phương thức thanh toán</Typography>
        <List>
            {paymentMethods.map((method) => (
                <ListItem key={method.paymentMethodId} alignItems="flex-start">
                    <ListItemText primary={method.paymentName} />
                    <ListItemText
                        primary={
                            <img
                                src={method.image} 
                                alt={method.image} 
                                style={{ width: '50px', height: '50px', borderRadius: '4px', marginTop: '5px' }}
                            />
                        }
                    />
                    <IconButton onClick={() => handleOpenModal('paymentMethod', method)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete('paymentMethod', method.paymentMethodId)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal('paymentMethod')}>
            Thêm phương thức thanh toán
        </Button>
    </>
);

export default PaymentMethodList;
