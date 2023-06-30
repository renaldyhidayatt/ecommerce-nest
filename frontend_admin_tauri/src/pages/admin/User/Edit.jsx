import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById, updateUserById } from '../../../redux/user';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRoles } from '../../../redux/role';

const EditUserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const myuser = useSelector((state) => state.user);

  const roles = useSelector((state) => state.role.roles);

  const { user, loading, error } = myuser;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('file', file);

    dispatch(updateUserById({ id, formData }));
  };

  useEffect(() => {
    dispatch(fetchUserById(id)).then((data) => console.log(data));
    dispatch(fetchAllRoles()).then((data) => console.log(data));
  }, []);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  if (loading) {
    return <h1>{loading.message}</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="page-heading">
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3>Edit User</h3>
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
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  name="role"
                  value={role}
                  onChange={(e) => setRole(parseInt(e.target.value))}
                  className="form-control"
                  id="role"
                >
                  <option value="-">Silahkan pilih</option>
                  {roles.map((role) => (
                    <>
                      <option key={role.role_id} value={role.role_id}>
                        {role.role}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  File
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                  id="file"
                  aria-describedby="fileHelp"
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
