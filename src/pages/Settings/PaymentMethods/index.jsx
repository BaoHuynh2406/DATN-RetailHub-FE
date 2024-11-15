import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Thay thế defaultImage bằng URL của ảnh mặc định nếu không có
const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

const PaymentMethodList = ({ paymentMethods, handleOpenModal, handleDelete }) => (
    <>
        <Typography variant="h6">Danh sách phương thức thanh toán</Typography>
        <List>
            {paymentMethods.map((method) => (
                <ListItem key={method.paymentMethodId} alignItems="flex-start">
                    <ListItemText primary={method.paymentName} />
                    <Box display="flex" flexDirection="column" alignItems="center" paddingTop="20px">
                        <img
                            src={method.image || defaultImage}
                            style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            sx={{
                                marginTop: 1,
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            {method.image ? 'Tên ảnh: ' + method.image.split('/').pop() : 'Chưa có ảnh'}
                        </Typography>
                    </Box>
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
