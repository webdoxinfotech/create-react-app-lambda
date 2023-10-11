import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";




function Home() {
  const authCtx= useContext(AuthContext)
  const [posts, setPosts] = useState([]);

  useEffect(function () {
    fetch("http://sachin12344.pythonanywhere.com/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  function deleteHandler(id) {
    fetch(`http://sachin12344.pythonanywhere.com/posts/${id}/`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        alert("Record Deleted!");
      }
    });
  }



  return (
    <div>
      <Nav setPosts={setPosts} />
      <Container>
        <h2>Home</h2>
        {posts &&
          posts.map((post) => (
            <div>
              <h3>{post.title}</h3>
              <h5>{post.dated}</h5>
              <img src={post.image} width="300" alt={post.title} />
              <p>{post.text}</p>
              {authCtx.isLoggedIn && <button onClick={() => deleteHandler(post.id)}>DELETE</button>}

              <br />
              <Link to={`/update-post/${post.id}`}>UPDATE</Link>
            </div>
          ))}
      </Container>
    </div>
  );
}

export default Home;
