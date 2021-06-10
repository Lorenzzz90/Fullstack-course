import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import { prettyDOM } from '@testing-library/dom'


test('<BlogForm /> the eventhandler is called with right details', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'author test' }
  })
  fireEvent.change(url, {
    target: { value: 'url test' }
  })
  fireEvent.change(title, {
    target: { value: 'title test' }
  })
  fireEvent.submit(form)


  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('title test')
  expect(addBlog.mock.calls[0][0].url).toBe('url test')
  expect(addBlog.mock.calls[0][0].author).toBe('author test')

})