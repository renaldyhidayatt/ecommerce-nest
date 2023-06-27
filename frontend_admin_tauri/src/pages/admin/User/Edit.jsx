import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../../../redux/user';
import { useDispatch, useSelector } from 'react-redux';

const EditUserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { users, loading, error } = user;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', {
      firstname,
      lastname,
      email,
      password,
    });
  };

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const currentUser = users.find((user) => user.user_id === id);
      if (currentUser) {
        setFirstname(currentUser.firstname);
        setLastname(currentUser.lastname);
        setEmail(currentUser.email);
        setPassword(currentUser.password);
      }
    }
  }, [users]);

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>{/* Replace with the actual heading */}</h3>
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
                  Edit User
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h3>Edit User</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstname" className="form-label">
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="form-control"
                  id="nama"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="form-control"
                  id="nama"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  id="nama"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="nama"
                  aria-describedby="emailHelp"
                />
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

export default EditUserPage;
