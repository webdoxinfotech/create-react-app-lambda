import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



function Update() {
  const navigate = useNavigate();

    const title = useRef();
    const text = useRef();

    const {id} = useParams()
    const [post, setPost] = useState({})

      useEffect(function(){
        
        fetch(`https://sachin12344.pythonanywhere.com/posts/${id}/`).then(res => res.json()).then(data => setPost(data))

      }, []) 


      function updateHandler(e) {
        e.preventDefault()
        fetch(`https://sachin12344.pythonanywhere.com/posts/${id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: '{"title":"world", "text":"hello"}',
          body: JSON.stringify({
            'title': title.current.value,
        'text': text.current.value
          }),
        }).then(res => {
          if (res.ok) {
            alert("Record Updated!")
            navigate("/");
          }
        });
      }

  return (
    <div>
        <h2>UPDATE FORM</h2>
        <form onSubmit={updateHandler}>
          <div class="mb-3">
            <label for="title" class="form-label">
              Title
            </label>
            <input type="text" id="title" className="form-control" placeholder="Enter title" ref={title} defaultValue={post.title || "" } />
          </div>

          <div class="mb-3">
            <label for="text" class="form-label">
              Text
            </label>
            <textarea id="text" className="form-control" placeholder="Enter Text" ref={text} defaultValue={post.text || "" } />
          </div>
          <input type="submit" value="Update the Post" className="btn btn-primary" />
        </form>
    </div>
  )
}

export default Update