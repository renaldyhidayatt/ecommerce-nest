import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliderById } from '../../../redux/slider';
import { useParams } from 'react-router-dom';

const EditSliderPage = () => {
    const {id} = useParams();
  const slider = useSelector((state) => state.slider);



  const { sliders, loading, error } = slider;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchSliderById(id))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Edit Slider - Page</h3>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
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
            {error && <div className="alert alert-danger">{error}</div>}
            {sliders &&
              sliders.map((row) => (
                <form key={row.slider_id} onSubmit={handleSubmit}>
                  <input type="hidden" name="slider_id" value={row.slider_id} />
                  <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                      Nama
                    </label>
                    <input type="text" name="nama" value={row.nama} className="form-control" id="nama" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Gambar
                    </label>
                    <input type="file" name="image" className="form-control" id="image" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="current_image" className="form-label">
                      Gambar Saat Ini
                    </label>
                    <br />
                    {row.image ? (
                      <img src={row.image} alt="Current Image" style={{ width: '200px' }} />
                    ) : (
                      <span>Tidak ada gambar</span>
                    )}
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

export default EditSliderPage;
