import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRole } from '../../../redux/role';

export default function ModalRole() {
  const [roleName, setRoleName] = useState('');
  const dispatch = useDispatch();

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      role: roleName,
    };

    dispatch(createRole(formData));
  };

  return (
    <div
      className="modal fade text-left"
      id="role"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="role"
      aria-hidden="true"
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <label htmlFor="role">Nama Role: </label>
          <div className="form-group">
            <input
              id="role"
              type="text"
              name="role"
              placeholder="Nama Role"
              className="form-control"
              value={roleName}
              onChange={handleRoleNameChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary ms-1"
            data-bs-dismiss="modal"
          >
            Adding
          </button>
        </div>
      </form>
    </div>
  );
}
