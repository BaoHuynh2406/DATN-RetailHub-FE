function createData(id, userId, fullName, password, email, phoneNumber, address, image, startDate, endDate, status, roleId) {
    return { id, userId, fullName, password, email, phoneNumber, address, image, startDate, endDate, status, roleId };
}

const EmployeeData = [
    createData(1, 'NV001', 'Nguyễn Đình Vũ', 'password1', 'vu001@example.com', '0399259327', '123 Main St', '/src/assets/images/avtvu.jpg', '1/02/2023', 'N/A', 'Active', 'manage'),
    createData(2, 'NV002', 'Nguyễn Văn A', 'password2', 'vu002@example.com', '0399259327', '456 Second St', '/src/assets/images/avtvu.jpg', '2/02/2023', 'N/A', 'Active', 'manage'),
    createData(3, 'NV003', 'Nguyễn Văn B', 'password3', 'vu003@example.com', '0399259327', '789 Third St', '/src/assets/images/avtvu.jpg', '3/02/2023', 'N/A', 'Inactive', 'manage'),
    createData(4, 'NV004', 'Nguyễn Văn C', 'password4', 'vu004@example.com', '0399259327', '101 Fourth St', '/src/assets/images/avtvu.jpg', '4/02/2023', 'N/A', 'Active', 'manage'),
    createData(5, 'NV005', 'Nguyễn Văn D', 'password5', 'vu005@example.com', '0399259327', '202 Fifth St', '/src/assets/images/avtvu.jpg', '5/02/2023', 'N/A', 'Active', 'manage'),
    createData(6, 'NV006', 'Nguyễn Văn E', 'password6', 'vu006@example.com', '0399259327', '303 Sixth St', '/src/assets/images/avtvu.jpg', '6/02/2023', 'N/A', 'Inactive', 'manage'),
    createData(7, 'NV007', 'Nguyễn Văn F', 'password7', 'vu007@example.com', '0399259327', '404 Seventh St', '/src/assets/images/avtvu.jpg', '7/02/2023', 'N/A', 'Active', 'manage'),
    createData(8, 'NV008', 'Nguyễn Văn G', 'password8', 'vu008@example.com', '0399259327', '505 Eighth St', '/src/assets/images/avtvu.jpg', '8/02/2023', 'N/A', 'Active', 'manage'),
];

export default EmployeeData;
