import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const loginFormRef = useRef()
  const createBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const deleteBlog = (id) => {
    const x = blogs.filter(blog => blog.id === id)
    const blog = x[0]
    if (window.confirm(`Remove ${blog.title} by ${blog.author} ?`)) {
      blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const handleLogin = async (credentials) => {
    loginFormRef.current.toggleVisibility()
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setMessage(`Logged in as ${user.username}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception){
      setMessage(
        'Wrong username or password'
      )
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const handleCreateNewBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage(
        'The blog has some invalid value'
      )
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login' ref={loginFormRef}>
      <LoginForm sendLoginInfo={handleLogin} />
    </Togglable>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage(`${user.username} logged out`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createNewBlog = () => (
    <Togglable buttonLabel='create' ref={createBlogRef}>
      <BlogForm addBlog={handleCreateNewBlog} />
    </Togglable>
  )

  const showBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    const mappedBlogs = sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user} />
    )
    return (
      <div>
        <h2>blogs</h2>
        {mappedBlogs}
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} isError={isError} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>Logout</button></p>
          {showBlogs()}
          {createNewBlog()}
        </div>}
    </div>
  )
}

export default App