import React from 'react'

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
}
  
const Total = ({ parts }) => {
  const sum = parts.reduce((sum, parts) =>
   sum + parts.exercises , 0)
  return(
    <p><b>total of {sum} exercises</b></p>
  ) 
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>    


const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} key={course.id}  />
      <div>
        {course.parts.map(parts => 
          <Part key={parts.id} name={parts.name} exercises={parts.exercises} />
        )}
      </div>
      <div>
        <Total parts={course.parts} />
      </div>
    </div>
  )
}

export default Course