import React, { useContext, useRef } from "react";
import Nav from "../components/Nav";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

function AddPost() {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate()

  if (authCtx.isLoggedIn()) {
    navigate("/add-post")
  }
  function submitHandler(e) {
    e.preventDefault();

    const formdata = new FormData(e.target)

    fetch("http://sachin12344.pythonanywhere.com/posts/", {
      method: "POST",
      // body: '{"title":"one", "text":"one"}',
      body: formdata,
    }).then((res) => {
      if (res.ok) {
        alert("Record Inserted");
        navigate("/")
      }
    });
  }

  return (
    <div>
      <Nav />
      <Container>
        <h2>Add a Post</h2>
        <form onSubmit={submitHandler} method="post" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="title" class="form-label">
              Title
            </label>
            <input type="text" id="title" className="form-control" placeholder="Enter title" name="title" />
          </div>

          <div class="mb-3">
            <label for="text" class="form-label">
              Text
            </label>
            <textarea id="text" className="form-control" placeholder="Enter Text" name="text"></textarea>
          </div>

          <div>
            <label className="form-label">Image </label>
            <input type="file" name="image" className="form-control" />
          </div>
          <input type="submit" value="Add a  Post" className="btn btn-primary" />
        </form>
      </Container>
    </div>
  );
}

export default AddPost;
