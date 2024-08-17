function createData(id, code, name, phone, image, role, startingdate) {
    return { id, code, name, phone, image, role, startingdate };
}

const EmployeeData = [
    createData(1, 'NV001', 'aguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'manage', '1/02/2023'),
    createData(2, 'NV002', 'bguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'amanage', '2/02/2023'),
    createData(3, 'NV003', 'cguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'bmanage', '3/02/2023'),
    createData(4, 'NV004', 'dguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'cmanage', '4/02/2023'),
    createData(5, 'NV005', 'eguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'dmanage', '5/02/2023'),
    createData(6, 'NV006', 'fguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'emanage', '6/02/2023'),
    createData(7, 'NV007', 'kguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'fmanage', '7/02/2023'),
    createData(8, 'NV008', 'lguyễn Đình Vũ', '0399259327', '/src/assets/images/avtvu.jpg', 'gmanage', '8/02/2023'),
];

export default EmployeeData