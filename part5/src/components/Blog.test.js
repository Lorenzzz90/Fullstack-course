import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let blogDiv
  const deleteBlog = jest.fn()
  beforeEach(() => {
    const blog = {
      username: 'test',
      title: 'test title',
      author: 'test author',
      likes: 0,
      url: 'test url'
    }
    const user = {
      username: 'test'
    }


    component = render(
      <Blog blog={blog} user={user} deleteBlog={deleteBlog} />
    )
    blogDiv = component.container.querySelector('.blogDiv')
  })

  test('renders title and author but not url and likes by default', () => {

    expect(blogDiv).toHaveTextContent('test title')
    expect(blogDiv).toHaveTextContent('test author')
    expect(blogDiv).not.toHaveTextContent('likes')
    expect(blogDiv).not.toHaveTextContent('test url')
  })

  test('when view button is clicked likes and url are showed', () => {
    console.log(prettyDOM(blogDiv))

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(blogDiv).toHaveTextContent('test title')
    expect(blogDiv).toHaveTextContent('test author')
    expect(blogDiv).toHaveTextContent('likes')
    expect(blogDiv).toHaveTextContent('test url')
  })

  test('if remove button is pressed the handle function passed as param is called', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const removeButton = component.getByText('Remove')
    fireEvent.click(removeButton)
    expect(deleteBlog.mock.calls).toHaveLength(1)
  })
})




