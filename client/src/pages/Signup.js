import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import "../../src/index.css"

function Signup(props) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { data } = await addUser({
      variables: { ...formState },
    });
    const token = data.addUser.token;
    Auth.login(token);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
      <div className="card text-light">
          <h2 className="text-light">Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2 text-light">
              <label className="form-label" htmlFor="username">Username</label>
              <input className="form-control"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-control"
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label className="form-label" htmlFor="pwd">Password</label>
              <input className="form-control"
                placeholder="**"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row flex-end mb-4">
              <button className="button" type="submit">Submit</button>
            </div>
          </form>
          <Link to="/login">Login instead</Link>
        </div>
        </div>
        </div>
        </div>

  );
}

export default Signup;
