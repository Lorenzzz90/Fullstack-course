import React, { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const AnecdoteOfTheDay = ({selected, anecdotes, votes, setSelected, setVotes}) => {

  const randomAnecdote = () => {
    let randomCheck = selected
    while (randomCheck === selected) {
      randomCheck = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomCheck)   
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <Button handleClick={vote} text="vote" />
        <Button handleClick={randomAnecdote} text="next anecdote" />
      </div>
    </div>

  )
}

const AnecdoteWithMostVotes = ({anecdotes, votes}) => {
  let i = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[i]}</p>
      <p>has {Math.max(...votes)} votes</p>
    </div>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  return (
    <div>
      <AnecdoteOfTheDay anecdotes={anecdotes} selected={selected} setSelected={setSelected} votes={votes} setVotes={setVotes}/>
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App