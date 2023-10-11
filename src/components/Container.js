import React from 'react'

function Container(props) {
  return (
    <div className='container mt-4 px-4 py-3 shadow' style={{minHeight: '100vh'}}>{props.children}</div>
  )
}

export default Container