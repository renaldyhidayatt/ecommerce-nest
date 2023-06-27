import React from 'react';
import { useSelector } from 'react-redux';

const EditProductPage = () => {
  const categories = useSelector((state) => state.categories);
  const product = useSelector((state) => state.product);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Product</h3>
            
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  product
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h3>Edit Product</h3>
          </div>
          <div className="card-body">
            {/* Render form errors here */}
            {product.data &&
              product.data.map((row) => (
                <form key={row.product_id} onSubmit={handleSubmit}>
                  <input type="hidden" name="product_id" value={row.product_id} />
                  <label htmlFor="name_produk">Nama Produk: </label>
                  <div className="form-group">
                    <input
                      id="name_produk"
                      type="text"
                      name="name"
                      value={row.name}
                      placeholder="Nama Produk"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Gambar
                    </label>
                    <input type="file" name="image" className="form-control" id="image" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="current_image" className="form-label">
                      Gambar Saat Ini
                    </label>
                    <br />
                    {row.image_product ? (
                      <img src={row.image_product} alt="Current Image" style={{ width: '200px' }} />
                    ) : (
                      <span>Tidak ada gambar</span>
                    )}
                  </div>
                  <label htmlFor="category_id">ID Kategori: </label>
                  <div className="form-group">
                    <select name="category_id" className="form-control">
                      <option value="">Pilih Kategori</option>
                      {categories.data &&
                        categories.data.map((k) => (
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
                      value={row.description}
                    />
                  </div>

                  <label htmlFor="price">Harga: </label>
                  <div className="form-group">
                    <input
                      id="price"
                      type="text"
                      name="price"
                      value={row.price}
                      placeholder="Harga"
                      className="form-control"
                    />
                  </div>
                  <label htmlFor="countInStock">Jumlah Stok: </label>
                  <div className="form-group">
                    <input
                      id="countInStock"
                      type="text"
                      name="countInStock"
                      value={row.countInStock}
                      placeholder="Jumlah Stok"
                      className="form-control"
                    />
                  </div>

                  <button type="submit" name="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProductPage;
