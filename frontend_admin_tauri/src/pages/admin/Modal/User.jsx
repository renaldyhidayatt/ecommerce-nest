import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../redux/user';

export default function ModalUser() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const handleChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    dispatch(createUser(formData));

    window.location.reload();
  };
  return (
    <div
      className="modal fade text-left"
      id="user"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="user"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="user">
              Add User
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
              <label htmlFor="firstname">Firstname: </label>
              <div className="form-group">
                <input
                  id="firstname"
                  type="text"
                  name="firstname"
                  placeholder="Firstname"
                  className="form-control"
                  value={firstname}
                  onChange={handleChangeFirstname}
                />
              </div>
              <label htmlFor="lastname">Lastname: </label>
              <div className="form-group">
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder="Lastname"
                  className="form-control"
                  value={lastname}
                  onChange={handleChangeLastname}
                />
              </div>
              <label htmlFor="email">Email: </label>
              <div className="form-group">
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  className="form-control"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <label htmlFor="password">Password: </label>
              <div className="form-group">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={handleChangePassword}
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
