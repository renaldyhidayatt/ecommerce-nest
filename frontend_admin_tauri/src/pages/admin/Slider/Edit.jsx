import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderById, updateSliderById } from '../../../redux/slider';
import { useNavigate, useParams } from 'react-router-dom';

const EditSliderPage = () => {
  const { id } = useParams();
  const myslider = useSelector((state) => state.slider);
  const navigate = useNavigate();

  const { slider, loading, error } = myslider;
  const dispatch = useDispatch();

  const [nama, setNama] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchSliderById(id)).then((data) => console.log(data));
  }, []);

  useEffect(() => {
    if (slider) {
      setNama(slider.nama);
    }
  }, [slider]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nama', nama);
    formData.append('file', file);

    dispatch(updateSliderById({ id, formData })).then((data) => {
      console.log(data);
      navigate('/admin/slider');
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Edit Slider - Page</h3>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-header float-start float-lg-end"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Slider
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h3>Edit Slider</h3>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error.message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama
                </label>
                <input
                  type="text"
                  name="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="form-control"
                  id="nama"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Gambar
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  id="image"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="current_image" className="form-label">
                  Gambar Saat Ini
                </label>
                <br />
                {slider.image ? (
                  <img
                    src={'http://localhost:5000/' + slider.image}
                    alt="Current Image"
                    style={{ width: '200px' }}
                  />
                ) : (
                  <span>Tidak ada gambar</span>
                )}
              </div>
              <button type="submit" name="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditSliderPage;
