import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const DisplayH2 = ({ text }) => <h2>{text}</h2> 

const Statistic = ({ text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, bad, neutral}) => {

  const total = () => good + neutral + bad
  const average = () => (good - bad) / (good + bad + neutral)
  const percentage = () => ((good / total() * 100) + " %")

  if (total() === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <DisplayH2 text="statistics" />
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={total()} />
          <Statistic text="average" value={average()} />
          <Statistic text="positive" value={percentage()} />
        </tbody>
      </table>
    </div>

  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <div>
      <DisplayH2 text="give feedback" />
      <Button handleClick={goodClick} text="good" />
      <Button handleClick={neutralClick} text="neutral" />
      <Button handleClick={badClick} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App