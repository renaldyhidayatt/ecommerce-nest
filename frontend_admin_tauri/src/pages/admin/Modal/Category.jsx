import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../redux/category';

export default function ModalCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', name);
    form.append('file', image);

    // Do something with the form data
    dispatch(createCategory(form));
  };

  return (
    // Modal content
    <div
      className="modal fade text-left"
      id="category"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="category"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="category">
              Add Kategori
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
              <label htmlFor="name_kategori">Nama Kategori: </label>
              <div className="form-group">
                <input
                  id="name_kategori"
                  type="text"
                  name="nama_kategori"
                  placeholder="Nama Kategori"
                  className="form-control"
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <label htmlFor="image">image: </label>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
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
