import React, { useState } from 'react';
import {
  Container, Typography, Tabs, Tab, Box, Paper, TextField, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Main Settings Component
export default function Settings() {
  const [tabValue, setTabValue] = useState(0);

  // Dữ liệu hiện tại
  const [categories, setCategories] = useState([{ name: "Đồ uống" }, { name: "Thực phẩm" }]);
  const [taxes, setTaxes] = useState([{ name: "VAT", rate: 10 }]);
  const [paymentMethods, setPaymentMethods] = useState([{ name: "Tiền mặt" }, { name: "Thẻ tín dụng" }]);

  // State để quản lý modal và dữ liệu
  const [openModal, setOpenModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [newTax, setNewTax] = useState({ name: '', rate: '' });
  const [modalType, setModalType] = useState(''); // Loại modal hiện tại: 'category', 'tax', 'payment'
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Xử lý thay đổi Tab
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mở modal
  const handleOpenModal = (type, item = null, index = null) => {
    setModalType(type);
    setIsEditMode(!!item); // Kiểm tra có đang chỉnh sửa không
    setEditIndex(index);

    if (item) {
      if (type === 'tax') {
        setNewTax(item);
      } else {
        setNewItem(item.name);
      }
    }
    setOpenModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewItem('');
    setNewTax({ name: '', rate: '' });
    setIsEditMode(false);
    setEditIndex(null);
  };

  // Thêm hoặc cập nhật dữ liệu mới
  const handleAddOrUpdate = () => {
    if (modalType === 'category') {
      if (isEditMode && editIndex !== null) {
        const updatedCategories = [...categories];
        updatedCategories[editIndex] = { name: newItem };
        setCategories(updatedCategories);
      } else {
        setCategories([...categories, { name: newItem }]);
      }
    } else if (modalType === 'tax') {
      if (isEditMode && editIndex !== null) {
        const updatedTaxes = [...taxes];
        updatedTaxes[editIndex] = newTax;
        setTaxes(updatedTaxes);
      } else {
        setTaxes([...taxes, newTax]);
      }
    } else if (modalType === 'payment') {
      if (isEditMode && editIndex !== null) {
        const updatedPayments = [...paymentMethods];
        updatedPayments[editIndex] = { name: newItem };
        setPaymentMethods(updatedPayments);
      } else {
        setPaymentMethods([...paymentMethods, { name: newItem }]);
      }
    }

    handleCloseModal();
  };

  // Xóa dữ liệu
  const handleDelete = (type, index) => {
    if (type === 'category') {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
    } else if (type === 'tax') {
      const updatedTaxes = taxes.filter((_, i) => i !== index);
      setTaxes(updatedTaxes);
    } else if (type === 'payment') {
      const updatedPayments = paymentMethods.filter((_, i) => i !== index);
      setPaymentMethods(updatedPayments);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cài đặt hệ thống
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Loại hàng" />
          <Tab label="Thuế" />
          <Tab label="Phương thức thanh toán" />
        </Tabs>

        {/* Loại hàng */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6">Danh sách loại hàng</Typography>
          <List>
            {categories.map((category, index) => (
              <ListItem key={index}>
                <ListItemText primary={category.name} />
                <IconButton onClick={() => handleOpenModal('category', category, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete('category', index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal('category')}>
            Thêm loại hàng
          </Button>
        </TabPanel>

        {/* Thuế */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6">Danh sách thuế</Typography>
          <List>
            {taxes.map((tax, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${tax.name} - ${tax.rate}%`} />
                <IconButton onClick={() => handleOpenModal('tax', tax, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete('tax', index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal('tax')}>
            Thêm thuế
          </Button>
        </TabPanel>

        {/* Phương thức thanh toán */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6">Danh sách phương thức thanh toán</Typography>
          <List>
            {paymentMethods.map((method, index) => (
              <ListItem key={index}>
                <ListItemText primary={method.name} />
                <IconButton onClick={() => handleOpenModal('payment', method, index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete('payment', index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal('payment')}>
            Thêm phương thức thanh toán
          </Button>
        </TabPanel>
      </Paper>

      {/* Modal thêm mới */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{isEditMode ? 'Chỉnh sửa' : 'Thêm mới'} {modalType === 'category' ? 'loại hàng' : modalType === 'tax' ? 'thuế' : 'phương thức thanh toán'}</DialogTitle>
        <DialogContent>
          {modalType === 'category' || modalType === 'payment' ? (
            <TextField
              fullWidth
              label={modalType === 'category' ? 'Tên loại hàng' : 'Tên phương thức thanh toán'}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              variant="outlined"
              sx={{ mt: 2 }}
            />
          ) : (
            <>
              <TextField
                fullWidth
                label="Tên thuế"
                value={newTax.name}
                onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <TextField
                fullWidth
                label="Phần trăm thuế (%)"
                value={newTax.rate}
                onChange={(e) => setNewTax({ ...newTax, rate: e.target.value })}
                variant="outlined"
                sx={{ mt: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Hủy</Button>
          <Button onClick={handleAddOrUpdate} color="primary">{isEditMode ? 'Cập nhật' : 'Thêm'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
