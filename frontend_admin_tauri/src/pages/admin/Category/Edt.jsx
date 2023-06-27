import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCategory, fetchCategoryById } from '../../../redux/category';
import { useParams } from 'react-router-dom';

const EditCategoryPage = () => {
  const { id } = useParams();

  const category = useSelector((state) => state.category);
  const [categoryData, setCategoryData] = useState({ category_id: '', nama_kategori: '', image: null });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    if (e.target.name === 'image') {
      setCategoryData({ ...categoryData, [e.target.name]: e.target.files[0] });
    } else {
      setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editCategory(categoryData));
  };

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>{heading}</h3>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {heading}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h3>Edit Category</h3>
          </div>
          <div className="card-body">
            {category.error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {category.error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
            {category.categoryData && (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="hidden" name="category_id" value={categoryData.category_id} />
                <div className="mb-3">
                  <label htmlFor="nama_kategori" className="form-label">
                    Nama Kategori
                  </label>
                  <input
                    type="text"
                    name="nama_kategori"
                    value={categoryData.nama_kategori}
                    className="form-control"
                    id="nama_kategori"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Gambar
                  </label>
                  <input type="file" name="image" className="form-control" id="image" onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="current_image" className="form-label">
                    Gambar Saat Ini
                  </label>
                  <br />
                  {categoryData.image_category ? (
                    <img
                      src={`assets/img/upload/category/${categoryData.image_category}`}
                      alt="Current Image"
                      style={{ width: '200px' }}
                    />
                  ) : (
                    <span>Tidak ada gambar</span>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditCategoryPage;
