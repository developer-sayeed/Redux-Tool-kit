import { useEffect, useState } from "react";
import "./User.scss";
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, featchAllUser } from "./userApi";
import { getAllUserData } from "./userSlice";
import swal from "sweetalert";

const User = () => {
  const dispatch = useDispatch();
  const { user, loading, message } = useSelector(getAllUserData);
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    password: "",
  });

  // handle input change
  const handInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // From Submit

  const handleUserCreate = (e) => {
    e.preventDefault();
    dispatch(createUser(input));
  };

  useEffect(() => {
    dispatch(featchAllUser());
  }, dispatch);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Add New User</div>
              <div className="card-body">
                <form onSubmit={handleUserCreate}>
                  <div className="my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      value={input.name}
                      name="name"
                      onChange={handInputChange}
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={input.username}
                      name="username"
                      onChange={handInputChange}
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={input.email}
                      name="email"
                      onChange={handInputChange}
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Passwords"
                      value={input.password}
                      name="password"
                      onChange={handInputChange}
                    />
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Role"
                      value={input.role}
                      name="role"
                      onChange={handInputChange}
                    />
                  </div>

                  <div className="my-3">
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <h2>User</h2>
            <hr />
            {loading && <h1>Loading......</h1>}
            <hr />
            <table className="table">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {user.length > 0 ? (
                  user.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                        <td>{data.role}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => dispatch(deleteUser(data._id))}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="d-flex justify-content-center">
                    <p>User Data Not Found</p>
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
