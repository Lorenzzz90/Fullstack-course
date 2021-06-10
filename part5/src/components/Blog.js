import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog, user }) => {
  const [hidden, setHidden] = useState(true)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewButtonHandler = (event) => {
    event.preventDefault()
    setHidden(!hidden)
  }

  const addLike = (event) => {
    event.preventDefault()
    const updatedBlog = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    setLikes(likes + 1)
    const id = blog.id
    blogService.update(id, updatedBlog)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    deleteBlog(blog.id)
  }

  return (
    <div style={blogStyle} className={'blogDiv'}>
      {hidden ?
        <div>
          {blog.title} {blog.author} <button onClick={viewButtonHandler}>view</button>
        </div> :
        <div>
          {blog.title} <button onClick={viewButtonHandler}>hide</button><br/>
          {blog.url}<br/>
          likes <span className='likes'>{likes}</span> <button id='like-button' onClick={addLike}>like</button><br/>
          {blog.author}<br/>
          {(user.username === blog.username) ? <button onClick={handleDelete}>Remove</button> : ''}
        </div>
      }
    </div>
  )}

export default Blog