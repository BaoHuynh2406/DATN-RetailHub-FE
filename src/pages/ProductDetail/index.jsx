import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ProductDetail = () => {
  const [product, setProduct] = useState({
    productId: '',
    productName: '',
    barCode: '',
    category: '',
    description: '',
    expiryDate: '',
    taxRate: '',
    location: '',
    entryDate: '',
    salePrice: '',
    unit: '',
    stockQuantity: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Logic lưu sản phẩm
    console.log('Lưu sản phẩm', product);
  };

  const handleDelete = () => {
    // Logic xóa sản phẩm
    console.log('Xóa sản phẩm', product.productId);
  };

  const handleRestore = () => {
    // Logic khôi phục sản phẩm
    console.log('Khôi phục sản phẩm', product.productId);
  };

  const handleReset = () => {
    setProduct({
      productId: '',
      productName: '',
      barCode: '',
      category: '',
      description: '',
      expiryDate: '',
      taxRate: '',
      location: '',
      entryDate: '',
      salePrice: '',
      unit: '',
      stockQuantity: '',
      imageUrl: '',
    });
  };

  const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết hàng hóa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Mã sản phẩm</label>
            <input
              type="text"
              name="productId"
              value={product.productId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bar Code</label>
            <input
              type="text"
              name="barCode"
              value={product.barCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loại</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày hết hạn</label>
            <input
              type="date"
              name="expiryDate"
              value={product.expiryDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày gia nhập</label>
            <input
              type="date"
              name="entryDate"
              value={product.entryDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giá bán</label>
            <input
              type="text"
              name="salePrice"
              value={product.salePrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label className="block text-sm font-medium text-gray-700 h-12">Ảnh sản phẩm</label>
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
            />
            <img
              src={product.imageUrl || defaultImage}
              alt="Product"
              className="mt-4 w-full h-64 object-cover rounded-md"
            />
          </label>
          <div className="space-y-4 mt-4 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tỉ lệ thuế</label>
              <input
                type="text"
                name="taxRate"
                value={product.taxRate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vị trí</label>
              <input
                type="text"
                name="location"
                value={product.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Đơn vị tính</label>
              <input
                type="text"
                name="unit"
                value={product.unit}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Số tồn kho</label>
              <input
                type="number"
                name="stockQuantity"
                value={product.stockQuantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-5">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Lưu
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Xóa
        </button>
        <button
          onClick={handleRestore}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Khôi phục
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Reset Form
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
