    function createCustomerData(
        customerId,
        fullName,
        phoneNumber,
        points,
        isActive,
        isDelete,
    ) {
        return { customerId, fullName, phoneNumber, points, isActive, isDelete };
    }

    const CustomerData = [
        createCustomerData(
            'KH001',
            'Nguyễn Đình Vũ',
            '0399259327',
            120,
            true,
            false,
        ),
        createCustomerData(
            'KH002',
            'Nguyễn Văn A',
            '0399259328',
            200,
            true,
            false,
        ),
        createCustomerData(
            'KH003',
            'Nguyễn Văn B',
            '0399259329',
            50,
            true,
            true,
        ),
        createCustomerData(
            'KH004',
            'Nguyễn Văn C',
            '0399259330',
            300,
            true,
            false,
        ),
        createCustomerData(
            'KH005',
            'Nguyễn Văn D',
            '0399259331',
            180,
            true,
            false,
        ),
        createCustomerData(
            'KH006',
            'Nguyễn Văn E',
            '0399259332',
            75,
            true,
            false,
        ),
        createCustomerData(
            'KH007',
            'Nguyễn Văn F',
            '0399259333',
            400,
            true,
            false,
        ),
        createCustomerData(
            'KH008',
            'Nguyễn Văn G',
            '0399259334',
            10,
            false,
            true,
        ),
    ];

    export default CustomerData;
