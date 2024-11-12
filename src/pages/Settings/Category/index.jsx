// CategoryList.js
import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoryList = ({ categories, handleOpenModal, handleDelete }) => (
    <>
        <Typography variant="h6">Danh sách loại hàng</Typography>
        <List>
            {categories.map((category, index) => (
                <ListItem key={category.categoryId}>
                    <ListItemText primary={category.categoryName} />
                    <IconButton onClick={() => handleOpenModal('category', category, index)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete('category', category.categoryId)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal('category')}>
            Thêm loại hàng
        </Button>
    </>
);

export default CategoryList;
