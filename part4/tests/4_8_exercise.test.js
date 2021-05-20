const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(helper.testUser)
  const blogObject = helper.sixBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('six blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.sixBlogs.length)
})

test('the unique identifier is called id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  expect(blog.id).toBeDefined()
})

describe('posting a blog', () => {
  beforeEach(async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'test', password: 'test' })
    token = loginResponse.body.token
    console.log(loginResponse.body)
  })

  test('http post succesfully creates a new blog post', async () => {
    await api
      .post('/api/blogs')
      .send(helper.postBlog)
      .set('Authorization', `bearer ${token}`)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.sixBlogs.length + 1)
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain('Number7')
    const seventhNote = response.body[6]
    expect(seventhNote).toMatchObject(helper.postBlog)
  })

  test('if a post request miss the likes property it will default to 0', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogWithZeroLikes)
      .set('Authorization', `bearer ${token}`)

    const response = await api.get('/api/blogs')
    const seventhNote = response.body[6]
    expect(seventhNote.likes).toBe(0)
  })

  test('if url and/or title is missing a status 400 is returned', async () => {
    await api
      .post('/api/blogs')
      .send(helper.blogMissing)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

  })

  test('blog is correctly deleted if given id is correct', async() => {
    const blogsAtStart = await api.get('/api/blogs')
    const newBlog = await api
      .post('/api/blogs')
      .send(helper.postBlog)
      .set('Authorization', `bearer ${token}`)

    await api
      .delete(`/api/blogs/${newBlog.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length)

    const titles = blogsAtEnd.body.map(blog => blog.title)
    expect(titles).not.toContain(newBlog.body.title)

  })
})


test('blog likes are updated correctly if given id is correct and likes are passed', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]
  blogToUpdate.likes = 123123

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)

  const blogsAtEnd = await api.get('/api/blogs')
  const likes = blogsAtEnd.body[0].likes
  expect(likes).toBe(123123)
})

describe('user creation testing', () => {
  test('an already existant user is not added to the database', async () => {
    const usersAtStart = await api.get('/api/users')

    const response = await api
      .post('/api/users')
      .send(helper.testUser)
      .expect(400)
    expect(response.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value:')

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)

  })

  test('if username length is less then 3 the user is not added', async () => {
    const usersAtStart = await api.get('/api/users')
    const user = {
      username: 'sh',
      name: 'shorty',
      password: 'longEnough'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
    expect(response.body.error).toContain('is shorter than the minimum allowed length (3)')
    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)

  })

  test('if password length is less then 3 the user is not added', async () => {
    const usersAtStart = await api.get('/api/users')
    const user = {
      username: 'longEnough',
      name: 'shorty',
      password: 'sh'
    }

    const response = await api
      .post('/api/users')
      .send(user)
      .expect(400)
    expect(response.body.error).toContain('password must be at least 3 character long')
    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length)

  })

  test('an user is correctly added if match the specifications', async () => {
    const usersAtStart = await api.get('/api/users')
    const user = {
      username: 'longEnough',
      name: 'Long',
      password: 'alsoLongEnough'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

  })
})




afterAll(() => {
  mongoose.connection.close()
})