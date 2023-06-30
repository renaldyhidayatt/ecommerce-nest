import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../../redux/category';
import { createProduct } from '../../../redux/product';

export default function ModalProduct() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleCountInStockChange = (e) => {
    setCountInStock(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category_id', categoryId);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('countInStock', countInStock);
    formData.append('file', image);

    dispatch(createProduct(formData));
  };

  return (
    // Modal content
    <div
      className="modal fade text-left"
      id="product"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="product"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="product">
              Add Product
            </h4>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i data-feather="x" />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <label htmlFor="name_produk">Nama Produk: </label>
              <div className="form-group">
                <input
                  id="name_produk"
                  type="text"
                  name="name"
                  placeholder="Nama Produk"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <label htmlFor="image">Gambar: </label>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
              <label htmlFor="category_id">ID Kategori: </label>
              <div className="form-group">
                <select
                  name="category_id"
                  className="form-control"
                  value={categoryId}
                  onChange={handleCategoryIdChange}
                >
                  <option value="">Pilih Kategori</option>
                  {categories &&
                    categories.map((k) => (
                      <option key={k.category_id} value={k.category_id}>
                        {k.nama_kategori}
                      </option>
                    ))}
                </select>
              </div>
              <label htmlFor="description">Deskripsi: </label>
              <div className="form-group">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Deskripsi"
                  className="form-control"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <label htmlFor="price">Harga: </label>
              <div className="form-group">
                <input
                  id="price"
                  type="text"
                  name="price"
                  placeholder="Harga"
                  className="form-control"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
              <label htmlFor="countInStock">Jumlah Stok: </label>
              <div className="form-group">
                <input
                  id="countInStock"
                  type="text"
                  name="countInStock"
                  placeholder="Jumlah Stok"
                  className="form-control"
                  value={countInStock}
                  onChange={handleCountInStockChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light-secondary"
                data-bs-dismiss="modal"
              >
                <i className="bx bx-x d-block d-sm-none" />
                <span className="d-none d-sm-block">Close</span>
              </button>
              <button
                type="submit"
                className="btn btn-primary ms-1"
                data-bs-dismiss="modal"
              >
                <i className="bx bx-check d-block d-sm-none" />
                <span className="d-none d-sm-block">Adding</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
