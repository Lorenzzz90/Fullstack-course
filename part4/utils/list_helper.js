// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLike = (blogs) => {
  return(
    blogs.reduce((sum, blog) => sum + blog.likes, 0)
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return
  } else {
    return(
      blogs.reduce((best, blog) => best.likes > blog.likes ? best : blog, { likes: 0 }))
  }
}

module.exports = {
  dummy,
  totalLike,
  favoriteBlog
}