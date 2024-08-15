import React from 'react';

const necessaryEmployeeData = employees.map(({ employeeId, name, phone, image, position, startDate }, index) => ({
    stt: index + 1,
    employeeId,
    name,
    phone,
    image,
    position,
    startDate,
}));

function EmployeeList() {
    return (
        <div>
            <h1>Danh sách nhân viên</h1>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã nhân viên</th>
                        <th>Họ và tên</th>
                        <th>SĐT</th>
                        <th>Ảnh</th>
                        <th>Vai trò</th>
                        <th>Ngày vào làm</th>
                    </tr>
                </thead>
                <tbody>
                    {necessaryEmployeeData.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.stt}</td>
                            <td>{employee.employeeId}</td>
                            <td>{employee.name}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <img
                                    src={employee.image ? URL.createObjectURL(employee.image) : 'https://via.placeholder.com/50'}
                                    alt="Ảnh nhân viên"
                                    width="50"
                                    height="50"
                                />
                            </td>
                            <td>{employee.position}</td>
                            <td>{employee.startDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
