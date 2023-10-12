import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";


function Nav({setPosts}) {
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const [searchTerm, setSearchTerm] = useState()

  function logoutHandler() {
      authCtx.logout()
      navigate("/login")
      localStorage.removeItem("token")

  }


  function searchHandler(e) {
    e.preventDefault()
    fetch(`https://sachin12344.pythonanywhere.com/search/?search=${searchTerm}`)
    .then((res) => res.json())
    .then((data) => setPosts(data));
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Webdox
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {!authCtx.isLoggedIn && <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>}
            {authCtx.isLoggedIn && <li className="nav-item">
              <button className="nav-link" onClick={logoutHandler}>
                Logout
              </button>
            </li>}
            <li className="nav-item">
              <Link className="nav-link" to="/add-post">
                Add a Post
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={searchHandler}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
