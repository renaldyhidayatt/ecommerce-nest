import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoleById, updateRoleById } from '../../../redux/role';

const EditRolePage = () => {
  const { id } = useParams();
  const role = useSelector((state) => state.role);
  const { loading, error, selectedRole } = role;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoleById(id));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(updateRoleById(formData));
  };

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Role</h3>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Role
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h3>Edit Role</h3>
          </div>
          <div className="card-body">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            )}
            {selectedRole && (
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="role_id" value={selectedRole.role_id} />
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">Nama Role</label>
                  <input type="text" name="role" defaultValue={selectedRole.role} className="form-control" id="role" aria-describedby="emailHelp" />
                </div>
                <button type="submit" name="submit" className="btn btn-primary">Submit</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditRolePage;
