import React, { useContext, useEffect, useRef } from "react";
import Nav from "../components/Nav";
import Container from "../components/Container";
import AuthContext from "../store/auth-context";

function Login() {
  const username = useRef();
  const password = useRef();
  const authctx = useContext(AuthContext)

  useEffect(function () {}, []);

  function submitHandler(e) {
    e.preventDefault();
    fetch("http://sachin12344.pythonanywhere.com/api-token-auth/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      // body: '{"username":"admin", "password":"admin"}',
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        authctx.login(data.token)
        localStorage.setItem("token", data.token)
      });
     
  }

  return (
    <div>
      <Nav />
      <Container>
        <h2>Login Page</h2>
        <form onSubmit={submitHandler}>
          <div class="mb-3">
            <label for="username" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              ref={username}
              placeholder="Enter username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">
              password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              ref={password}
              placeholder="Enter password"
            />
          </div>

          <input type="submit" value="Login" className="btn btn-primary" />
        </form>
      </Container>
    </div>
  );
}

export default Login;
